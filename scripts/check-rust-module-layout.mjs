import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const rustSrcRoot = path.join(repoRoot, "src-tauri", "src");
const discouragedDirs = ["application", "domain", "infrastructure", "interface"];
const violations = [];

for (const dirName of discouragedDirs) {
  const dirPath = path.join(rustSrcRoot, dirName);
  if (!fs.existsSync(dirPath)) {
    continue;
  }

  const entries = fs.readdirSync(dirPath);
  if (entries.length > 0) {
    violations.push(
      `src-tauri/src/${dirName} is expected to stay empty or be removed. Found: ${entries.join(", ")}`
    );
  }
}

if (violations.length > 0) {
  console.error("Rust module layout guard failed:");
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  process.exit(1);
}

console.log("Rust module layout guard passed.");
