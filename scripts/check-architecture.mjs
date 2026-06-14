import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const srcRoot = path.join(repoRoot, "src");

const violations = [];

scanDirectory(srcRoot);

if (violations.length > 0) {
  console.error("Architecture guard failed:");
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  process.exit(1);
}

console.log("Architecture guard passed.");

function scanDirectory(dirPath) {
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const nextPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      scanDirectory(nextPath);
      continue;
    }

    if (!/\.(ts|tsx)$/.test(entry.name)) {
      continue;
    }

    checkFile(nextPath);
  }
}

function checkFile(filePath) {
  const source = fs.readFileSync(filePath, "utf8");
  const relativeFilePath = toPosix(path.relative(repoRoot, filePath));
  const currentFeature = detectFeature(relativeFilePath);

  for (const match of source.matchAll(/from\s+["']([^"']+)["']/g)) {
    const importPath = match[1];

    if (importPath.startsWith("@features/")) {
      const parts = importPath.split("/");
      const targetFeature = parts[1];
      const targetSubpath = parts.slice(2).join("/");

      if (currentFeature && targetFeature !== currentFeature && targetSubpath !== "") {
        violations.push(
          `${relativeFilePath} imports private path "${importPath}" from feature "${targetFeature}". Use that feature's public index instead.`
        );
      }
    }

    if (currentFeature && importPath.startsWith("../features/")) {
      violations.push(
        `${relativeFilePath} uses relative feature import "${importPath}". Use @features aliases and public module exports.`
      );
    }
  }
}

function detectFeature(relativeFilePath) {
  const normalized = toPosix(relativeFilePath);
  const match = normalized.match(/^src\/features\/([^/]+)\//);
  return match ? match[1] : null;
}

function toPosix(filePath) {
  return filePath.split(path.sep).join("/");
}
