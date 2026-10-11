import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

function getMarkdownFiles(dir) {
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

const mdFiles = getMarkdownFiles(repoRoot);
let totalLinks = 0;
let totalFrontmatter = 0;
const errors = [];

// Regular expression to find markdown links: [text](target)
// Ignores image links ![alt](path) if they're standard links or verifies image paths as well
const linkRegex = /(?<!!)\[([^\]]*)\]\(([^)]*)\)/g;

for (const filePath of mdFiles) {
  const relativeFilePath = path.relpath ? path.relpath(repoRoot, filePath) : path.relative(repoRoot, filePath);
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  // Verify frontmatter for templates in .github/ISSUE_TEMPLATE/
  if (filePath.includes('.github/ISSUE_TEMPLATE')) {
    totalFrontmatter++;
    if (!content.startsWith('---\n')) {
      errors.push(`[FRONTMATTER] ${relativeFilePath}: Missing opening frontmatter delimiter '---'.`);
    } else {
      const secondDelimiter = content.indexOf('\n---\n', 4);
      if (secondDelimiter === -1) {
        errors.push(`[FRONTMATTER] ${relativeFilePath}: Missing closing frontmatter delimiter '---'.`);
      }
    }
  }

  // Verify links line by line to provide line numbers
  lines.forEach((line, index) => {
    const lineNum = index + 1;
    let match;
    while ((match = linkRegex.exec(line)) !== null) {
      const linkText = match[1];
      const linkTarget = match[2].trim();

      if (!linkTarget) {
        errors.push(`[EMPTY LINK] ${relativeFilePath}:${lineNum}: Empty link target for '[${linkText}]()'.`);
        continue;
      }

      // Skip web and mailto links, and anchor-only links
      if (
        linkTarget.startsWith('http://') ||
        linkTarget.startsWith('https://') ||
        linkTarget.startsWith('mailto:') ||
        linkTarget.startsWith('#')
      ) {
        continue;
      }

      totalLinks++;
      const targetWithoutAnchor = linkTarget.split('#')[0];
      if (!targetWithoutAnchor) continue;

      const fileDir = path.dirname(filePath);
      const resolvedPath = path.resolve(fileDir, targetWithoutAnchor);

      if (!fs.existsSync(resolvedPath)) {
        errors.push(
          `[BROKEN LINK] ${relativeFilePath}:${lineNum}: [${linkText}](${linkTarget}) -> File not found: ${path.relative(repoRoot, resolvedPath)}`
        );
      }
    }
  });
}

console.log('--- LittleSteps Documentation Verification ---');
console.log(`Inspected ${mdFiles.length} Markdown files.`);
console.log(`Verified ${totalLinks} relative internal links.`);
console.log(`Verified ${totalFrontmatter} issue template frontmatter blocks.`);

if (errors.length > 0) {
  console.error('\nDocumentation validation FAILED with errors:');
  errors.forEach((err) => console.error(`  - ${err}`));
  process.exit(1);
} else {
  console.log('\nAll documentation quality checks PASSED cleanly!');
  process.exit(0);
}
