import { Dependency } from '@flamework/core';
import { Networking } from '@flamework/networking';

type ClientToServerEvents = {};

type ServerToClientEvents = {};

interface ClientToServerFunctions {
  recieveFull: () => [buffer, defined[][]];
}

type ServerToClientFunctions = {};

export const GlobalEvents = Networking.createEvent<
  ClientToServerEvents,
  ServerToClientEvents
>();

export const GlobalFunctions = Networking.createFunction<
  ClientToServerFunctions,
  ServerToClientFunctions
>();
