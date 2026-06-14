import { spawnSync } from "node:child_process";
import path from "node:path";

const repoRoot = process.cwd();
const typescriptCli = path.join(repoRoot, "node_modules", "typescript", "bin", "tsc");

const commands = [
  {
    label: "TypeScript",
    command: process.execPath,
    args: [typescriptCli, "--noEmit"]
  },
  {
    label: "Architecture",
    command: process.execPath,
    args: ["scripts/check-architecture.mjs"]
  },
  {
    label: "Rust layout",
    command: process.execPath,
    args: ["scripts/check-rust-module-layout.mjs"]
  }
];

for (const item of commands) {
  const result = spawnSync(item.command, item.args, {
    stdio: "inherit"
  });

  if (result.error) {
    console.error(`${item.label} check failed to start: ${result.error.message}`);
    process.exit(1);
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

console.log("All checks passed.");
