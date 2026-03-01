/**
 * @author savruun
 * @description Sets hooks for the clients.
 * @date 20260225
 */

// Service imports
import { Players } from '@rbxts/services';

// Type imports
import type { System } from '@type/System';

// Package imports
import * as jecs from '@rbxts/jecs';
import { Phase } from '@rbxts/planck';

// Local player constants
const local_player = Players.LocalPlayer;
const mouse = local_player.GetMouse();

const client_hooks: System = ({ world, ct }) => {
  // When the local player's character is added set the mouse target filter.
  world.set(ct.character, jecs.OnAdd, (_, __, character) => {
    if (!local_player.Character || character !== local_player.Character) return;

    // Makes raycasts ignore the local character.
    mouse.TargetFilter = character;
  });
};

export = {
  phase: Phase.Startup,
  system: client_hooks,
};
