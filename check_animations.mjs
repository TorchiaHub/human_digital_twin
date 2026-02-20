import { NodeIO } from '@gltf-transform/core';

async function run() {
    const io = new NodeIO();
    const doc = await io.read('public/human_body.glb');

    const animations = doc.getRoot().listAnimations();
    console.log(`Found ${animations.length} animations in the GLB file.`);
    animations.forEach(anim => {
        console.log(` - Animation: ${anim.getName() || 'Unnamed'}`);
    });
}
run();
