import * as THREE from 'three';
import metaversefile from 'metaversefile';
const {useApp, createApp, useScene} = metaversefile;

export default () => {
  const app = useApp();
  const scene = useScene();

  const range = app.getComponent('range') ?? 3;
  const maxMobs = 10;
  let ghostApps = null;
  
  (async () => {
    const u = 'https://webaverse.github.io/ghost/';
    const m = await metaversefile.import(u);
    const r = () => -range + Math.random() * 2 * range;
    
    const promises = [];
    for (let i = 0; i < maxMobs; i++) {
      promises.push((async () => {
        const ghostApp = await createApp();

        ghostApp.position.copy(app.position)
          .add(new THREE.Vector3(
            r(),
            0, // r(),
            r(),
          ));
        ghostApp.quaternion.copy(app.quaternion);
        scene.add(ghostApp);
        ghostApp.updateMatrixWorld();

        await ghostApp.addModule(m);

        // console.log('new ghost app', ghostApp);
      })());
    }
    ghostApps = await Promise.all(promises);
  })();

  /* useFrame(() => {
    if (ghostApps) {
      for (const ghostApp of ghostApps) {
        ghostApp.update();
      }
    }
  }); */

  /* app.addEventListener('frame', e => {
    // npc.
  }); */

  return app;
};