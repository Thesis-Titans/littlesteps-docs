import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { parseMarkdownLinks, validateFrontmatter, verifyRepository } from './verify-docs.mjs';

console.log('Running verify-docs unit test suite...\n');

// 1. Link parsing tests
{
  const sample = `
[Standard](docs/file.md)
[With Title](docs/file.md "Helpful Title")
[Single Quote Title](docs/file.md 'Another Title')
[With Anchor](docs/file.md#my-heading)
[Encoded Space](docs/my%20file.md)
![Image Link](assets/diagram.png)
![Image With Title](assets/diagram.png "Diagram Title")
[External Web](https://github.com/Thesis-Titans)
[Email Link](mailto:test@example.com)
[Anchor Only](#local-section)
[Empty Target]()
`;

  const parsed = parseMarkdownLinks(sample);
  assert.strictEqual(parsed.length, 11, 'Should find 11 links in sample');

  // Standard
  assert.strictEqual(parsed[0].targetPath, 'docs/file.md');
  assert.strictEqual(parsed[0].isImage, false);

  // With title
  assert.strictEqual(parsed[1].targetPath, 'docs/file.md');
  assert.strictEqual(parsed[1].isImage, false);

  // With single-quote title
  assert.strictEqual(parsed[2].targetPath, 'docs/file.md');

  // With anchor
  assert.strictEqual(parsed[3].targetPath, 'docs/file.md');
  assert.strictEqual(parsed[3].anchor, 'my-heading');

  // Encoded space
  assert.strictEqual(parsed[4].targetPath, 'docs/my file.md');

  // Image link
  assert.strictEqual(parsed[5].targetPath, 'assets/diagram.png');
  assert.strictEqual(parsed[5].isImage, true);

  // Image with title
  assert.strictEqual(parsed[6].targetPath, 'assets/diagram.png');
  assert.strictEqual(parsed[6].isImage, true);

  // External web
  assert.strictEqual(parsed[7].rawTarget, 'https://github.com/Thesis-Titans');

  // Email
  assert.strictEqual(parsed[8].rawTarget, 'mailto:test@example.com');

  // Anchor only
  assert.strictEqual(parsed[9].rawTarget, '#local-section');

  // Empty target
  assert.strictEqual(parsed[10].isEmpty, true);

  console.log('✔ parseMarkdownLinks: all 11 link forms parsed accurately.');
}

// 2. Frontmatter validation tests
{
  const validFm = `---
name: Bug Report
about: Describe a defect
title: "[BUG]: "
labels: bug
---
# Content here
`;
  const validResult = validateFrontmatter(validFm, 'bug_report.md');
  assert.strictEqual(validResult.isValid, true);
  assert.strictEqual(validResult.data.name, 'Bug Report');
  assert.strictEqual(validResult.data.about, 'Describe a defect');
  console.log('✔ validateFrontmatter: valid frontmatter passes.');

  const missingOpening = `name: Bug Report
about: Describe a defect
---
`;
  const bad1 = validateFrontmatter(missingOpening, 'bad1.md');
  assert.strictEqual(bad1.isValid, false);
  assert.ok(bad1.errors.some((e) => e.includes('Missing opening frontmatter delimiter')));
  console.log('✔ validateFrontmatter: missing opening delimiter caught.');

  const missingClosing = `---
name: Bug Report
about: Describe a defect
# Content without closing
`;
  const bad2 = validateFrontmatter(missingClosing, 'bad2.md');
  assert.strictEqual(bad2.isValid, false);
  assert.ok(bad2.errors.some((e) => e.includes('Missing closing frontmatter delimiter')));
  console.log('✔ validateFrontmatter: missing closing delimiter caught.');

  const missingName = `---
about: Describe a defect
---
`;
  const bad3 = validateFrontmatter(missingName, 'bad3.md');
  assert.strictEqual(bad3.isValid, false);
  assert.ok(bad3.errors.some((e) => e.includes("Missing required frontmatter field 'name'")));
  console.log('✔ validateFrontmatter: missing required field name caught.');

  const missingAbout = `---
name: Feature Proposal
---
`;
  const bad4 = validateFrontmatter(missingAbout, 'bad4.md');
  assert.strictEqual(bad4.isValid, false);
  assert.ok(bad4.errors.some((e) => e.includes("Missing required frontmatter field 'about'")));
  console.log('✔ validateFrontmatter: missing required field about caught.');
}

// 3. Broken link detection in mock directory
{
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'verify-docs-test-'));
  try {
    fs.mkdirSync(path.join(tmpDir, 'docs'));
    fs.writeFileSync(path.join(tmpDir, 'existing.md'), '# Existing file\n');
    fs.writeFileSync(
      path.join(tmpDir, 'README.md'),
      '# Test\n[Good link](existing.md)\n[Broken link](missing.md)\n'
    );

    const result = verifyRepository(tmpDir);
    assert.strictEqual(result.errors.length, 1);
    assert.ok(result.errors[0].includes('File not found: missing.md'));
    console.log('✔ verifyRepository: broken relative link successfully detected.');
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

console.log('\nAll verify-docs unit tests PASSED successfully!\n');
