// > node scripts/release.js patch|minor|major

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const type = process.argv[2];

if (!["patch", "minor", "major"].includes(type)) {
  console.error("Usage: node scripts/release.js <patch|minor|major>");
  process.exit(1);
}

// Bump version in package.json
execSync(`npm version ${type} --no-git-tag-version`, { stdio: "inherit" });

const version = require("../package.json").version;
const versionTag = `v${version}`;
const date = new Date().toISOString().split("T")[0];

// --- Build combined CSS ---
const packagesDir = path.join(__dirname, "../packages");
const newVersionDir = path.join(packagesDir, versionTag);

const srcDir = path.join(__dirname, "../src");
console.log(`\nBuilding from src/`);

// Create new version dir
fs.mkdirSync(newVersionDir, { recursive: true });

// Copy individual CSS files from src/ into the new version dir
const cssFiles = ["au.reset.css", "au.normalize.css", "au.flex.css"];
for (const file of cssFiles) {
  const src = path.join(srcDir, file);
  const dest = path.join(newVersionDir, file);
  if (!fs.existsSync(src)) {
    console.error(`Error: ${file} not found in src/`);
    process.exit(1);
  }
  fs.copyFileSync(src, dest);
  console.log(`Copied src/${file}`);
}

// Concatenate into au.css
const combinedPath = path.join(newVersionDir, "au.css");
let combined = "";
for (const file of cssFiles) {
  const filePath = path.join(newVersionDir, file);
  if (fs.existsSync(filePath)) {
    combined += fs.readFileSync(filePath, "utf8");
    combined += "\n\n";
  }
}
fs.writeFileSync(combinedPath, combined.trimEnd() + "\n");
console.log(`Built packages/${versionTag}/au.css`);

// --- Update CHANGELOG ---
let commits = "";
try {
  const lastTag = execSync("git describe --tags --abbrev=0", { encoding: "utf8" }).trim();
  commits = execSync(`git log ${lastTag}..HEAD --pretty=format:"- %s"`, { encoding: "utf8" }).trim();
} catch {
  // No previous tags — grab full history
  commits = execSync(`git log --pretty=format:"- %s"`, { encoding: "utf8" }).trim();
}

const entry = `## [${version}] - ${date}\n${commits}\n\n`;

const changelogPath = path.join(__dirname, "../CHANGELOG.md");
const existing = fs.existsSync(changelogPath) ? fs.readFileSync(changelogPath, "utf8") : "# Changelog\n\n";
const insertAt = existing.indexOf("\n## ");
const updated =
  insertAt === -1
    ? existing.trimEnd() + "\n\n" + entry
    : existing.slice(0, insertAt + 1) + entry + existing.slice(insertAt + 1);

fs.writeFileSync(changelogPath, updated);
console.log(`\nCHANGELOG.md updated for ${versionTag}`);

// --- Commit, tag, push ---
execSync("git add package.json CHANGELOG.md packages/", { stdio: "inherit" });
execSync(`git commit -m "release: ${versionTag}"`, { stdio: "inherit" });
execSync(`git tag ${versionTag}`, { stdio: "inherit" });
execSync("git push && git push --tags", { stdio: "inherit" });

console.log(`\nReleased ${versionTag}`);
