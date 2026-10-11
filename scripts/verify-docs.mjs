import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Parses markdown links and image links from text.
 * Handles:
 * - Standard links: [text](target)
 * - Image links: ![alt](target)
 * - Links with optional titles: [text](target "title") or [text](target 'title')
 * - Links with anchors: [text](target#section)
 * - URI-encoded targets: [text](path%20with%20spaces.md)
 */
export function parseMarkdownLinks(content) {
  const links = [];
  const lines = content.split('\n');

  // Regex matches [text](target) or ![alt](target)
  // Group 1: '!' if image, undefined if link
  // Group 2: link text / alt text
  // Group 3: raw target inside parentheses
  const linkRegex = /(!)?\[([^\]]*)\]\(([^)]*)\)/g;

  lines.forEach((line, index) => {
    const lineNum = index + 1;
    let match;
    while ((match = linkRegex.exec(line)) !== null) {
      const isImage = match[1] === '!';
      const linkText = match[2];
      const rawTarget = match[3].trim();

      if (!rawTarget) {
        links.push({
          isImage,
          linkText,
          rawTarget,
          targetPath: '',
          anchor: '',
          lineNum,
          isEmpty: true,
        });
        continue;
      }

      // Check for optional title inside target: e.g. "path/to/file.md \"Title\"" or 'path/to/file.md \'Title\''
      let targetWithoutTitle = rawTarget;
      const titleMatch = rawTarget.match(/^(\S+)(?:\s+["'].*["'])?$/);
      if (titleMatch) {
        targetWithoutTitle = titleMatch[1];
      }

      // Separate path from anchor
      const anchorIndex = targetWithoutTitle.indexOf('#');
      let targetPath = targetWithoutTitle;
      let anchor = '';
      if (anchorIndex !== -1) {
        targetPath = targetWithoutTitle.slice(0, anchorIndex);
        anchor = targetWithoutTitle.slice(anchorIndex + 1);
      }

      // Decode URI components (e.g. %20 -> space)
      let decodedPath = targetPath;
      try {
        decodedPath = decodeURIComponent(targetPath);
      } catch {
        // keep raw if malformed
      }

      links.push({
        isImage,
        linkText,
        rawTarget,
        targetPath: decodedPath,
        anchor,
        lineNum,
        isEmpty: false,
      });
    }
  });

  return links;
}

/**
 * Validates YAML frontmatter in issue templates.
 * Checks for opening/closing '---' delimiters and required fields (name, about).
 */
export function validateFrontmatter(content, filePath = '') {
  const errors = [];
  if (!content.startsWith('---\n') && !content.startsWith('---\r\n')) {
    errors.push(`Missing opening frontmatter delimiter '---'.`);
    return { isValid: false, errors, data: {} };
  }

  // Find closing delimiter
  const lines = content.split('\n');
  let closingIndex = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      closingIndex = i;
      break;
    }
  }

  if (closingIndex === -1) {
    errors.push(`Missing closing frontmatter delimiter '---'.`);
    return { isValid: false, errors, data: {} };
  }

  const frontmatterLines = lines.slice(1, closingIndex);
  const data = {};
  for (const line of frontmatterLines) {
    const colonIdx = line.indexOf(':');
    if (colonIdx !== -1) {
      const key = line.slice(0, colonIdx).trim();
      const val = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, '');
      data[key] = val;
    }
  }

  // Check required fields for GitHub issue templates
  if (!data.name || data.name.trim() === '') {
    errors.push(`Missing required frontmatter field 'name'.`);
  }
  if (!data.about || data.about.trim() === '') {
    errors.push(`Missing required frontmatter field 'about'.`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    data,
  };
}

/**
 * Traverses a directory recursively for markdown files.
 */
export function getMarkdownFiles(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      results.push(fullPath);
    }
  }
  return results;
}

/**
 * Runs full verification on a repository directory.
 */
export function verifyRepository(repoRoot) {
  const mdFiles = getMarkdownFiles(repoRoot);
  let totalLinks = 0;
  let totalImages = 0;
  let totalFrontmatter = 0;
  const errors = [];

  for (const filePath of mdFiles) {
    const relFile = path.relative(repoRoot, filePath);
    const content = fs.readFileSync(filePath, 'utf-8');

    // Frontmatter validation for issue templates
    if (filePath.includes(path.join('.github', 'ISSUE_TEMPLATE'))) {
      totalFrontmatter++;
      const fmResult = validateFrontmatter(content, relFile);
      if (!fmResult.isValid) {
        fmResult.errors.forEach((err) => {
          errors.push(`[FRONTMATTER] ${relFile}: ${err}`);
        });
      }
    }

    // Link validation
    const links = parseMarkdownLinks(content);
    for (const link of links) {
      if (link.isImage) totalImages++;
      else totalLinks++;

      if (link.isEmpty) {
        errors.push(`[EMPTY LINK] ${relFile}:${link.lineNum}: Empty target in '[${link.linkText}]()'.`);
        continue;
      }

      // Ignore external protocols and anchor-only links
      if (
        link.rawTarget.startsWith('http://') ||
        link.rawTarget.startsWith('https://') ||
        link.rawTarget.startsWith('mailto:') ||
        link.rawTarget.startsWith('#')
      ) {
        continue;
      }

      // If target path is empty (e.g. link was just #anchor), skip
      if (!link.targetPath) continue;

      const fileDir = path.dirname(filePath);
      const resolvedPath = path.resolve(fileDir, link.targetPath);

      if (!fs.existsSync(resolvedPath)) {
        const itemType = link.isImage ? 'Image not found' : 'File not found';
        errors.push(
          `[BROKEN LINK] ${relFile}:${link.lineNum}: [${link.linkText}](${link.rawTarget}) -> ${itemType}: ${path.relative(repoRoot, resolvedPath)}`
        );
      }
    }
  }

  return {
    mdFileCount: mdFiles.length,
    totalLinks,
    totalImages,
    totalFrontmatter,
    errors,
  };
}

// CLI entry point when executed directly
const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  const __dirname = path.dirname(__filename);
  const repoRoot = path.resolve(__dirname, '..');

  console.log('--- LittleSteps Documentation & Link Verification ---');
  const result = verifyRepository(repoRoot);
  console.log(`Inspected ${result.mdFileCount} Markdown files.`);
  console.log(`Verified ${result.totalLinks} relative internal links and ${result.totalImages} image links.`);
  console.log(`Validated ${result.totalFrontmatter} issue template frontmatter blocks.`);

  if (result.errors.length > 0) {
    console.error('\nDocumentation validation FAILED with errors:');
    result.errors.forEach((err) => console.error(`  - ${err}`));
    process.exit(1);
  } else {
    console.log('\nAll documentation and link checks PASSED cleanly!');
    process.exit(0);
  }
}
