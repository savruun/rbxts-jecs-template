import {
  Register,
  Command,
  CenturionType,
  type CommandContext,
} from '@rbxts/centurion';

@Register()
export class KickCommand {
  @Command({
    name: 'kick',
    description: 'Kick a player from the game.',
    arguments: [
      {
        name: 'player',
        type: CenturionType.Player,
        description: 'Player to kick.',
      },
      {
        name: 'reason',
        type: CenturionType.String,
        description: 'Reason for kicking.',
        optional: true,
      },
    ],
  })
  public kick(ctx: CommandContext, player: Player, reason: string) {
    if (ctx.executor === player) {
      return ctx.error('You cannot kick yourself.');
    }

    player.Kick(reason ?? 'You were kicked by a Game Moderator.');
    ctx.reply(`Successfully kicked ${player.Name} from the game.`);
  }
}
