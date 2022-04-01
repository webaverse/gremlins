// import * as THREE from 'three';
// import hpManager from './hp-manager.js';
import metaversefile from 'metaversefile';
const {useApp, createApp, useHpManager} = metaversefile;

export default () => {
  const app = useApp();
  const hpManager = useHpManager();

  const range = app.getComponent('range') ?? 3;
  const r = () => -range + Math.random() * 2 * range;
  const maxMobs = 10;

  let ghostApps = [];
  (async () => {
    const u = 'https://webaverse.github.io/ghost/';
    const m = await metaversefile.import(u);
    
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

        const hitTracker = hpManager.makeHitTracker();
        hitTracker.bind(ghostApp);
        hitTracker.addEventListener('die', () => {
          hitTracker.unbind(ghostApp);
          app.remove(ghostApp);
        });

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
  };
  app.hit = (damage, opts) => {
    const {physicsObject} = opts;
    for (const ghostApp of ghostApps) {
      const physicsObjects = ghostApp.getPhysicsObjects();
      if (physicsObjects.includes(physicsObject)) {
        ghostApp.hit(damage, opts);
        break;
      }
    }
  };

  return app;
};