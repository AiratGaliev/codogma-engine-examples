import { readdir, readFile, access } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const examplesDir = path.join(root, "examples");
const errors = [];
const projects = (await readdir(examplesDir, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

function fail(message) {
    errors.push(message);
}

async function exists(file) {
    try {
        await access(file);
        return true;
    } catch {
        return false;
    }
}

if (projects.length < 1) fail("В каталоге examples не найдено проектов.");

for (const project of projects) {
    const dir = path.join(examplesDir, project);
    for (const name of ["README.md", "index.html", "main.ts", "tsconfig.json"]) {
        if (!(await exists(path.join(dir, name)))) fail(`${project}: отсутствует ${name}`);
    }

    const readme = await readFile(path.join(dir, "README.md"), "utf8").catch(() => "");
    if (!readme.includes("4.2.1")) fail(`${project}: README должен явно указывать Phaser 4.2.1`);

    const html = await readFile(path.join(dir, "index.html"), "utf8").catch(() => "");
    if (!html.includes("phaser@4.2.1")) fail(`${project}: runtime должен быть закреплён на Phaser 4.2.1`);
    if (!html.includes("game.js")) fail(`${project}: index.html не подключает скомпилированный game.js`);

    const scenesDir = path.join(dir, "scenes");
    const sceneFiles = (await readdir(scenesDir).catch(() => []))
        .filter((name) => name.endsWith(".scene"))
        .sort();
    if (sceneFiles.length === 0) fail(`${project}: отсутствуют редактируемые файлы .scene`);

    const documents = [];
    for (const name of sceneFiles) {
        let scene;
        try {
            scene = JSON.parse(await readFile(path.join(scenesDir, name), "utf8"));
        } catch (error) {
            fail(`${project}/scenes/${name}: неверный JSON (${error.message})`);
            continue;
        }
        documents.push({ name, scene });

        if (!["SCENE", "PREFAB"].includes(scene.sceneType)) fail(`${project}/${name}: неверный sceneType`);
        if (!scene.settings?.sceneKey) fail(`${project}/${name}: отсутствует settings.sceneKey`);
        if (!Array.isArray(scene.displayList)) fail(`${project}/${name}: displayList не является массивом`);
        if (scene.meta?.contentType !== "phasereditor2d.core.scene.SceneContentType") {
            fail(`${project}/${name}: неверный contentType метаданных сцены`);
        }
        const ids = new Set();
        for (const object of scene.displayList ?? []) {
            if (typeof object.id !== "string" || !object.id) fail(`${project}/${name}: объект ${object.label ?? "(без label)"} не имеет id`);
            else if (ids.has(object.id)) fail(`${project}/${name}: повторяется id ${object.id}`);
            else ids.add(object.id);
            if (!object.label) fail(`${project}/${name}: объект без label`);
            if (object.type === "Text" && typeof object.text !== "string") {
                fail(`${project}/${name}: текстовый объект ${object.label} не содержит текст`);
            }
            if (object.prefabId && object.scope !== "CLASS") {
                fail(`${project}/${name}: экземпляр Prefab ${object.label} должен использовать scope=CLASS`);
            }
        }
        if (!(await exists(path.join(scenesDir, name.replace(/\.scene$/, ".ts"))))) {
            fail(`${project}/scenes/${name}: отсутствует соседний TypeScript-файл`);
        }
    }

    const prefabIds = new Set(documents.filter(({ scene }) => scene.sceneType === "PREFAB").map(({ scene }) => scene.id));
    for (const { name, scene } of documents) {
        for (const object of scene.displayList ?? []) {
            if (object.prefabId && !prefabIds.has(object.prefabId)) {
                fail(`${project}/${name}: prefabId объекта ${object.label} не указывает на Prefab этого проекта`);
            }
        }
    }
}

if (errors.length) {
    console.error("Проверка структуры примеров завершилась с ошибками:");
    for (const error of errors) console.error(`- ${error}`);
    process.exitCode = 1;
} else {
    console.log(`Проверено проектов: ${projects.length}. Формат сцен, метаданные, идентификаторы и ссылки Prefab согласованы.`);
}
