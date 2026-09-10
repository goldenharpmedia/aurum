// Full release in one shot — mirrors the web-ui flow.
// Commit your lib/ edits first, then:
//
//   > pnpm run release patch|minor|major
//
// This bumps the version, builds packages/vX.X.X/ + dist/ from lib/, updates
// the CHANGELOG, commits, tags vX.X.X, and pushes (commits + tags). The push
// triggers CI, which builds the promo page and deploys the site.

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const type = process.argv[2];

if (!["patch", "minor", "major"].includes(type)) {
  console.error("Usage: pnpm run release <patch|minor|major>");
  process.exit(1);
}

// Bump version in package.json only — the commit + tag happen below, after the
// build, so packages/ and dist/ land in the tagged commit.
execSync(`pnpm version ${type} --no-git-tag-version`, { stdio: "inherit" });

const version = require("../package.json").version;
const versionTag = `v${version}`;
const date = new Date().toISOString().split("T")[0];

// --- Build from lib/ ---
const libDir = path.join(__dirname, "../lib");
const newVersionDir = path.join(__dirname, "../packages", versionTag);
const distDir = path.join(__dirname, "../dist");
const cssFiles = ["au.reset.css", "au.normalize.css", "au.flex.css"];

console.log(`\nBuilding ${versionTag} from lib/`);
fs.mkdirSync(newVersionDir, { recursive: true });

// Copy the individual files into packages/vX.X.X/
for (const file of cssFiles) {
  const src = path.join(libDir, file);
  if (!fs.existsSync(src)) {
    console.error(`Error: ${file} not found in lib/`);
    process.exit(1);
  }
  fs.copyFileSync(src, path.join(newVersionDir, file));
}

// Concatenate into packages/vX.X.X/au.css
let combined = "";
for (const file of cssFiles) {
  combined += fs.readFileSync(path.join(newVersionDir, file), "utf8") + "\n\n";
}
fs.writeFileSync(path.join(newVersionDir, "au.css"), combined.trimEnd() + "\n");
console.log(`Built packages/${versionTag}/`);

// Mirror this release into dist/ — packages/vX.X.X/ is the permanent per-version
// archive served over the CDN; dist/ is always the latest release, and is what
// `github:`/npm installs and the promo page consume.
fs.mkdirSync(distDir, { recursive: true });
for (const file of [...cssFiles, "au.css"]) {
  fs.copyFileSync(path.join(newVersionDir, file), path.join(distDir, file));
}
console.log(`Updated dist/ to ${versionTag}`);

// --- Update CHANGELOG ---
let commits = "";
try {
  const lastTag = execSync("git describe --tags --abbrev=0", { encoding: "utf8" }).trim();
  commits = execSync(`git log ${lastTag}..HEAD --pretty=format:"- %s"`, { encoding: "utf8" }).trim();
} catch {
  commits = execSync(`git log --pretty=format:"- %s"`, { encoding: "utf8" }).trim();
}

const entry = `## [${version}] - ${date}\n${commits || "- (no commits since last release)"}\n\n`;
const changelogPath = path.join(__dirname, "../CHANGELOG.md");
const existing = fs.existsSync(changelogPath) ? fs.readFileSync(changelogPath, "utf8") : "# Changelog\n\n";
const insertAt = existing.indexOf("\n## ");
const updated =
  insertAt === -1
    ? existing.trimEnd() + "\n\n" + entry
    : existing.slice(0, insertAt + 1) + entry + existing.slice(insertAt + 1);
fs.writeFileSync(changelogPath, updated);
console.log(`CHANGELOG.md updated for ${versionTag}`);

// --- Commit, tag, push ---
execSync("git add package.json CHANGELOG.md packages/ dist/", { stdio: "inherit" });
execSync(`git commit -m "release: ${versionTag}"`, { stdio: "inherit" });
execSync(`git tag ${versionTag}`, { stdio: "inherit" });
execSync("git push && git push --tags", { stdio: "inherit" });

console.log(`\nReleased ${versionTag}`);
