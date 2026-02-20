import type { Entity } from '@rbxts/jecs';
import { world } from './world';

export const player_refs = {} as Record<string, Entity>;
export const character_refs = {} as Record<string, Entity>;

const ref_map = new Map<string, Record<string, Entity>>();

function ref_record(ref_type: string) {
  if (!ref_map.has(ref_type)) {
    ref_map.set(ref_type, {});
  }

  return ref_map.get(ref_type)!;
}

export function set_ref(ref_type: string, ref_key: string, value: Entity) {
  const record = ref_record(ref_type);
  record[ref_key] = value;

  ref_map.set(ref_type, record);
}

export function delete_ref(ref_type: string, ref_key: string) {}

export function ref(ref_type: string, ref_key: string) {
  const record = ref_record(ref_type);

  if (record[ref_key]) {
    return record[ref_key];
  } else {
    record[ref_key] = world.entity();
    return record[ref_key];
  }
}
