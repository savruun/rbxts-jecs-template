import {
  ReplicatedStorage,
  RunService,
  ServerScriptService,
} from '@rbxts/services'

export const shared = ReplicatedStorage.WaitForChild('shared') as Folder
export const react = shared.WaitForChild('react') as Folder

export const client = ReplicatedStorage.WaitForChild('client') as Folder

export const server = RunService.IsServer()
  ? (ServerScriptService.WaitForChild('server') as Folder)
  : undefined
