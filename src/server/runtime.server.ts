import { Flamework } from '@flamework/core';
import { world } from '@rbxts/jecs';

Flamework.addPaths('src/server/services');
Flamework.addPaths('src/shared/controllers');

Flamework.ignite();
