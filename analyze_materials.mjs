import { NodeIO } from '@gltf-transform/core';

async function run() {
    const io = new NodeIO();
    const doc = await io.read('public/human_body.glb');

    const materials = new Set();

    doc.getRoot().listMaterials().forEach(mat => {
        materials.add(mat.getName());
    });

    console.log("=== UNIQUE MATERIALS ===");
    Array.from(materials).sort().forEach(m => console.log(m));
}
run();
