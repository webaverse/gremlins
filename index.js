import * as THREE from 'three';
import metaversefile from 'metaversefile';
const {useApp, createApp, useScene} = metaversefile;

export default () => {
  const app = useApp();
  const scene = useScene();

  const range = app.getComponent('range') ?? 3;
  const maxMobs = 10;
  let ghostApps = [];
  
  (async () => {
    const u = 'https://webaverse.github.io/ghost/';
    const m = await metaversefile.import(u);
    const r = () => -range + Math.random() * 2 * range;
    
    const promises = [];
    for (let i = 0; i < maxMobs; i++) {
      promises.push((async () => {
        const ghostApp = createApp();
        ghostApp.name = 'ghost-' + i;

        ghostApp.position.set(
          r(),
          0, // r(),
          r()
        );
        ghostApp.quaternion.copy(app.quaternion);
        app.add(ghostApp);
        ghostApp.updateMatrixWorld();

        await ghostApp.addModule(m);

        // console.log('new ghost app', ghostApp);

        return ghostApp;
      })());
    }
    ghostApps = await Promise.all(promises);
  })();

  app.getPhysicsObjects = () => {
    const result = [];
    for (const ghostApp of ghostApps) {
      result.push.apply(result, ghostApp.getPhysicsObjects());
    }
    return result;
  }

  return app;
};