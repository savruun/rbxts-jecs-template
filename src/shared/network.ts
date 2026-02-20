import { Networking } from '@flamework/networking';

type ClientToServerEvents = {};

interface ServerToClientEvents {
  sendUpdates: (buf: buffer, variants: unknown[][]) => void;
  sendUnreliables: (buf: buffer, variants: unknown[][]) => void;
}

interface ClientToServerFunctions {
  recieveFull: () => [buffer, unknown[][]];
  // sendUpdates: (buf: buffer, variants: unknown[][]) => void
  // sendUnreliables: (buf: buffer, variants: unknown[][]) => void
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
