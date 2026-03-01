import type { System } from '@type/System';
import * as jecs from '@rbxts/jecs';
import { Phase } from '@rbxts/planck';

const shared_hooks: System = ({ ct, world }) => {
  world.add(jecs.ChildOf, jecs.pair(jecs.OnDeleteTarget, jecs.Remove));
  world.add(ct.instance, jecs.pair(jecs.OnDeleteTarget, jecs.Remove));
  world.add(ct.cleanup, jecs.pair(jecs.OnDeleteTarget, jecs.Remove));

  world.set(jecs.ChildOf, jecs.OnRemove, (e: jecs.Entity, _: number) => {
    const instance = world.get(e, ct.instance);
    instance?.Destroy();
  });

  world.set(ct.instance, jecs.OnRemove, (entity: jecs.Entity, _: number) => {
    const instance = world.get(entity, ct.instance);
    instance?.Destroy();
  });

  world.set(ct.cleanup, jecs.OnRemove, (entity: jecs.Entity, _: number) => {
    const trove = world.get(entity, ct.cleanup);
    trove?.clean();
  });
};

export = {
  system: shared_hooks,
  phase: Phase.Startup,
};
