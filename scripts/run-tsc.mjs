import { readdir } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const examplesDir = path.join(root, "examples");
const tscPath = path.join(root, "node_modules", "typescript", "bin", "tsc");
const checkOnly = process.argv.includes("--noEmit");

const entries = (await readdir(examplesDir, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

if (entries.length === 0) {
    console.error("В каталоге examples нет проектов.");
    process.exit(1);
}

let failed = false;
for (const name of entries) {
    const config = path.join(examplesDir, name, "tsconfig.json");
    const args = [tscPath, "-p", config];
    if (checkOnly) args.push("--noEmit");

    console.log(`\n[TypeScript] ${name}`);
    const result = spawnSync(process.execPath, args, {
        cwd: root,
        stdio: "inherit",
        env: process.env
    });
    if (result.error) {
        console.error(result.error.message);
        failed = true;
    } else if (result.status !== 0) {
        failed = true;
    }
}

if (failed) {
    process.exitCode = 1;
} else {
    console.log(checkOnly ? "\nTypeScript-проверка завершена." : "\nВсе проекты скомпилированы.");
}
