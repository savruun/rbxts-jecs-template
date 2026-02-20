import { backend } from '@rbxts/react-devtools-core';
import react_globals from '@rbxts/react-globals';

react_globals.__DEV__ = true;
react_globals.__PROFILE__ = true;

backend.connectToDevtools();
