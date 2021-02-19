import * as THREE from 'three';
import {renderer, scene, app, runtime, npc} from 'app';

(async () => {
  const maxMobs = 20;
  for (let i = 0; i < maxMobs; i++) {
    const u = 'https://webaverse.github.io/ghost/manifest.json';
    const o = await runtime.loadFile({
      name: u,
      url: u,
    }, {
      contentId: u,
    });
    o.position.set(
      -80, 0, 20
    ).add(new THREE.Vector3(
      -10 + Math.random() * 20,
      -10 + Math.random() * 20,
      -10 + Math.random() * 20
    ));
    const d = new THREE.Vector3(Math.random(), Math.random(), Math.random()).multiplyScalar(Math.PI*2);
    const euler = new THREE.Euler(0, d.y, 0, 'YXZ');
    o.quaternion.setFromEuler(euler);
    const components = o.getComponents();
    const componentIndex = components.findIndex(c => c.type === 'npc');
    npc.addNpc(o, componentIndex);
  }

  app.addEventListener('frame', e => {
    // npc.
  });
})();