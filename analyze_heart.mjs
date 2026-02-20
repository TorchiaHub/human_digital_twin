import { NodeIO } from '@gltf-transform/core';
import fs from 'fs';

async function run() {
    const io = new NodeIO();
    const doc = await io.read('public/human_body.glb');

    const results = [];
    doc.getRoot().listNodes().forEach(node => {
        const name = node.getName() ? node.getName().toLowerCase() : '';
        if (name.includes('heart') || name.includes('ventricle') || name.includes('atrium') || name.includes('aorta')) {
            const mesh = node.getMesh();
            if (mesh) {
                const mat = mesh.listPrimitives()[0].getMaterial();
                results.push({
                    node: node.getName(),
                    material: mat ? mat.getName() : 'None'
                });
            }
        }
    });
    fs.writeFileSync('heart_materials.json', JSON.stringify(results, null, 2));
}
run();
