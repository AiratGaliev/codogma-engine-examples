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

function visitObjects(objects, visitor, context) {
    if (!Array.isArray(objects)) return;
    for (const object of objects) {
        visitor(object, context);
        if (object.list !== undefined && !Array.isArray(object.list)) {
            fail(`${context}: вложенный список объекта ${object.label ?? "(без label)"} должен быть массивом`);
            continue;
        }
        if (Array.isArray(object.list)) visitObjects(object.list, visitor, context);
    }
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
    const sceneIds = new Set();
    for (const name of sceneFiles) {
        let scene;
        try {
            scene = JSON.parse(await readFile(path.join(scenesDir, name), "utf8"));
        } catch (error) {
            fail(`${project}/scenes/${name}: неверный JSON (${error.message})`);
            continue;
        }
        documents.push({ name, scene });

        if (typeof scene.id !== "string" || !scene.id) {
            fail(`${project}/scenes/${name}: отсутствует ID документа`);
        } else if (sceneIds.has(scene.id)) {
            fail(`${project}/scenes/${name}: повторяется ID документа ${scene.id}`);
        } else {
            sceneIds.add(scene.id);
        }

        if (!["SCENE", "PREFAB"].includes(scene.sceneType)) fail(`${project}/scenes/${name}: неверный sceneType`);
        if (scene.sceneType === "SCENE" && !scene.settings?.sceneKey) {
            fail(`${project}/scenes/${name}: у SCENE отсутствует settings.sceneKey`);
        }
        if (!Array.isArray(scene.displayList)) fail(`${project}/scenes/${name}: displayList не является массивом`);
        if (scene.sceneType === "PREFAB" && scene.displayList?.length !== 1) {
            fail(`${project}/scenes/${name}: Prefab должен иметь ровно один корневой объект`);
        }
        if (scene.meta?.contentType !== "phasereditor2d.core.scene.SceneContentType") {
            fail(`${project}/scenes/${name}: неверный contentType метаданных`);
        }

        const objectIds = new Set();
        visitObjects(scene.displayList, (object) => {
            if (typeof object.id !== "string" || !object.id) {
                fail(`${project}/scenes/${name}: объект ${object.label ?? "(без label)"} не имеет ID`);
            } else if (objectIds.has(object.id)) {
                fail(`${project}/scenes/${name}: повторяется ID объекта ${object.id}`);
            } else {
                objectIds.add(object.id);
            }
            if (!object.label) fail(`${project}/scenes/${name}: объект без label`);
            if (object.type === "Text" && typeof object.text !== "string") {
                fail(`${project}/scenes/${name}: текстовый объект ${object.label} не содержит текст`);
            }
            if (object.prefabId && object.scope !== "CLASS") {
                fail(`${project}/scenes/${name}: экземпляр Prefab ${object.label} должен использовать scope=CLASS`);
            }
        }, `${project}/scenes/${name}`);

        if (!(await exists(path.join(scenesDir, name.replace(/\.scene$/, ".ts"))))) {
            fail(`${project}/scenes/${name}: отсутствует соседний TypeScript-файл`);
        }
    }

    const prefabs = new Map(documents
        .filter(({ scene }) => scene.sceneType === "PREFAB")
        .map(({ scene }) => [scene.id, scene]));
    for (const { name, scene } of documents) {
        visitObjects(scene.displayList, (object) => {
            if (!object.prefabId) return;
            const prefab = prefabs.get(object.prefabId);
            if (!prefab) {
                fail(`${project}/scenes/${name}: prefabId объекта ${object.label} не указывает на Prefab этого проекта`);
                return;
            }
            const unlocked = new Set(object.unlock ?? []);
            const exposedProperties = (prefab.prefabProperties ?? []).map((property) => property.name);
            for (const property of exposedProperties) {
                if (object[property] !== undefined && !unlocked.has(property)) {
                    fail(`${project}/scenes/${name}: поле Prefab ${property} задано у ${object.label}, но отсутствует в unlock`);
                }
            }
            for (const property of unlocked) {
                if (!exposedProperties.includes(property)) {
                    fail(`${project}/scenes/${name}: unlock ${property} у ${object.label} не объявлен в prefabProperties`);
                }
            }
        }, `${project}/scenes/${name}`);
    }
}

if (errors.length) {
    console.error("Проверка структуры примеров завершилась с ошибками:");
    for (const error of errors) console.error(`- ${error}`);
    process.exitCode = 1;
} else {
    console.log(`Проверено проектов: ${projects.length}. JSON-сцены, вложенные ID, метаданные и Prefab-ссылки согласованы.`);
}
