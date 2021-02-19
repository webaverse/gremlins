import * as THREE from 'three';
// import {GLTFLoader} from 'GLTFLoader';
// import {BufferGeometryUtils} from 'BufferGeometryUtils';
import {renderer, scene, app, runtime, npc} from 'app';
// import easing from './easing.js';

(async () => {
  const maxMobs = 20;
  for (let i = 0; i < maxMobs; i++) {
    const o = await runtime.loadFile('./ghost/manifest.json');
    o.position.set(
      -10 + Math.random() * 20,
      -10 + Math.random() * 20,
      -10 + Math.random() * 20
    );
    const componentIndex = o.getComponents().findIndex(c => c.type === 'npc');
    npc.addNpc(o, componentIndex);
  }

  app.addEventListener('frame', e => {
    // npc.
  });
})();