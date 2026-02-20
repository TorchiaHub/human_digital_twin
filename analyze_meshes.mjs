import { NodeIO } from '@gltf-transform/core';

async function run() {
    const io = new NodeIO();
    const doc = await io.read('public/human_body.glb');

    console.log("=== MESH NAMES (first 50) ===");
    let count = 0;
    doc.getRoot().listNodes().forEach(node => {
        if (node.getMesh() && count < 50) {
            console.log(node.getName(), " | Mat:", node.getMesh().listPrimitives()[0].getMaterial()?.getName());
            count++;
        }
    });

    console.log("\nSearching for Lungs or Visceral:");
    doc.getRoot().listNodes().forEach(node => {
        if (node.getName().toLowerCase().includes('lung') || node.getName().toLowerCase().includes('heart') || node.getName().toLowerCase().includes('liver')) {
            console.log(node.getName());
        }
    });
}
run();
