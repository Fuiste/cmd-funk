import { Command, CommandMap, CommandContext } from "./types";
import { Marshallers } from "./util";
import minimist from "minimist";

export const getBaseCommand = async <CtxType>(
  context?: CtxType
): Promise<Command<CtxType>> => {
  // Grab base args
  const argv = minimist(process.argv.slice(2));

  // Build extras
  const ctxExtras = context ? context : ({} as CtxType);

  return getBaseCommandWithContext({ ...ctxExtras, argv });
};

export const getBaseCommandWithContext = async <CtxType>(
  ctx: CommandContext<CtxType>
): Promise<Command<CtxType>> => {
  let args = ctx.argv._;
  const cmd = args.shift();

  if (!cmd) throw "No command specified";

  return { cmd, args, ctx };
};

export const operateForCommand = async <CtxType>(
  command: Command<CtxType>,
  cmdMap: CommandMap<CtxType>
) => {
  if (!cmdMap[command.cmd])
    return Marshallers.error("Invalid command", command.cmd);

  try {
    return await cmdMap[command.cmd](command);
  } catch (e) {
    return Marshallers.error(e, command.cmd);
  }
};

export const popCommand = <CtxType>(
  command: Command<CtxType>
): Command<CtxType> => {
  if (command.args.length < 1) throw "Must specify a command";
  const cmd = command.args.shift();

  // This should never happen
  if (cmd === undefined) throw "Command cannot be undefined";

  return {
    cmd,
    args: command.args,
    ctx: command.ctx,
  };
};

export const popAndOperate = async <CtxType>(
  command: Command<CtxType>,
  cmdMap: CommandMap<CtxType>
) => operateForCommand(popCommand(command), cmdMap);
