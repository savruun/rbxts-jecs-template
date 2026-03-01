import Net, { Route } from '@rbxts/yetanothernet';

export const routes = {
  updates: new Route<[buffer, defined[][]]>({
    Event: undefined,
    Channel: 'Reliable',
  }),

  unreliable_updates: new Route<[buffer, defined[][]]>({
    Event: undefined,
    Channel: 'Unreliable',
  }),
};

export const [beginFrame, endFrame] = Net.createHook(routes);
