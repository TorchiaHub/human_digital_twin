import { NodeIO } from '@gltf-transform/core';

async function run() {
    const io = new NodeIO();
    const doc = await io.read('public/human_body.glb');

    // Dump ALL nodes that look like a grouping collection or have meshes
    const root = doc.getRoot();

    console.log("=== SCENES ===");
    doc.getRoot().listScenes().forEach(scene => {
        console.log("SCENE:", scene.getName());
        scene.listChildren().forEach(child => {
            printNode(child, 1);
        });
    });

    function printNode(node, depth) {
        const indent = "  ".repeat(depth);
        const name = node.getName();
        const childCount = node.listChildren().length;
        const mesh = node.getMesh();

        // Print if it's a structural node (collections) or just top level
        if (depth <= 2 || name.match(/^[1-9]:/)) {
            console.log(indent + name + (mesh ? " [MESH]" : "") + " (Children: " + childCount + ")");
        }

        node.listChildren().forEach(child => printNode(child, depth + 1));
    }
}
run();
