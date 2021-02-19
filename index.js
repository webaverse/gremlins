import * as THREE from 'three';
import {renderer, scene, app, runtime, npc} from 'app';

(async () => {
  const maxMobs = 20;
  for (let i = 0; i < maxMobs; i++) {
    const u = './ghost/manifest.json';
    const o = await runtime.loadFile({
      name: u,
      url: u,
    }, {
      contentId: u,
    });
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