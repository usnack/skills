#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const slug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
function inside(base, target) {
  const rel = path.relative(base, target);
  return rel !== '..' && !rel.startsWith(`..${path.sep}`) && !path.isAbsolute(rel);
}
function checkLinks(dir, boundary) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`배포 파일에 심볼릭 링크를 사용할 수 없습니다: ${file}`);
    if (entry.isDirectory()) checkLinks(file, boundary);
    else if (entry.name.endsWith('.md')) {
      const text = fs.readFileSync(file, 'utf8').replace(/<!--[\s\S]*?-->/g, '').replace(/```[\s\S]*?```/g, '');
      for (const match of text.matchAll(/\]\(([^\s)]+)\)/g)) {
        const link = match[1];
        if (/^(?:[a-z][a-z0-9+.-]*:|#)/i.test(link)) continue;
        const target = path.resolve(path.dirname(file), decodeURIComponent(link.split('#')[0]));
        assert(inside(boundary, target), `참조가 스킬 밖을 가리킵니다: ${file}: ${link}`);
        assert(fs.existsSync(target), `참조 파일이 없습니다: ${file}: ${link}`);
      }
    }
  }
}
try {
  const marketplace = readJson(path.join(root, '.agents/plugins/marketplace.json'));
  assert.equal(marketplace.name, 'usnack-skills');
  assert(marketplace.interface?.displayName);
  assert(marketplace.plugins?.length > 0);
  const plugins = new Set();
  const skills = new Set();
  for (const entry of marketplace.plugins) {
    assert(slug.test(entry.name) && !plugins.has(entry.name), `플러그인 이름 오류: ${entry.name}`);
    plugins.add(entry.name);
    assert.equal(entry.source.source, 'local');
    assert.equal(entry.source.path, `./plugins/${entry.name}`);
    assert.equal(entry.policy.installation, 'AVAILABLE');
    assert.equal(entry.policy.authentication, 'ON_INSTALL');
    assert(entry.category);
    const dir = path.join(root, entry.source.path);
    const manifest = readJson(path.join(dir, 'plugin.json'));
    assert.equal(manifest.$schema, 'https://agent-plugins.org/schemas/1.0.0/plugin.schema.json');
    assert.equal(manifest.name, entry.name);
    assert(/^\d{2}-\d{2}-\d{2}$/.test(manifest.version), '버전은 YY-MM-DD 형식이어야 합니다');
    const versionDate = new Date(`20${manifest.version}T00:00:00Z`);
    assert(!Number.isNaN(versionDate.getTime()) && versionDate.toISOString().slice(2, 10) === manifest.version, '버전은 유효한 날짜여야 합니다');
    assert(manifest.description?.trim() && manifest.author?.name);
    assert(fs.existsSync(path.join(dir, 'README.md')));
    const changelog = fs.readFileSync(path.join(dir, 'CHANGELOG.md'), 'utf8');
    assert(changelog.includes(`## ${manifest.version}`), '현재 버전의 변경 이력이 없습니다');
    const skillRoot = path.join(dir, 'skills');
    const entries = fs.readdirSync(skillRoot, { withFileTypes: true }).filter(e => e.isDirectory());
    assert(entries.length > 0, `스킬이 없습니다: ${entry.name}`);
    for (const skill of entries) {
      const skillDir = path.join(skillRoot, skill.name);
      const text = fs.readFileSync(path.join(skillDir, 'SKILL.md'), 'utf8');
      const frontmatter = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1];
      assert(frontmatter, `frontmatter 누락: ${skill.name}`);
      const name = frontmatter.match(/^name:\s*([a-z0-9-]+)\s*$/m)?.[1];
      assert.equal(name, skill.name);
      assert(slug.test(name) && !skills.has(name), `스킬 이름 오류 또는 중복: ${name}`);
      assert(/^description:[ \t]*\S.+$/m.test(frontmatter), `description 누락: ${name}`);
      skills.add(name);
      checkLinks(skillDir, skillDir);
    }
  }
  for (const entry of fs.readdirSync(path.join(root, 'plugins'), { withFileTypes: true })) {
    if (entry.isDirectory()) assert(plugins.has(entry.name), `마켓플레이스 미등록: ${entry.name}`);
  }
  console.log(`VALIDATION_OK plugins=${plugins.size} skills=${skills.size}`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
