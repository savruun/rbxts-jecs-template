import type { Entity } from '@rbxts/jecs';
import { world } from '@shared/ecs/world';

export const player_refs = {} as Record<string, Entity>;
export const character_refs = {} as Record<string, Entity>;

const ref_map = new Map<Instance | number | string, Entity>();

export function ref(instance: Instance | number | string): Entity {
  if (ref_map.has(instance)) {
    return ref_map.get(instance)!;
  } else {
    const e = world.entity();
    ref_map.set(instance, e);

    return e;
  }
}

export function has_ref(instance: Instance | number | string) {
  return ref_map.has(instance);
}

export function del_ref(instance: Instance | number | string) {
  ref_map.delete(instance);
}
