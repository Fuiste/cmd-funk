import { Command, CommandMap, CommandContext } from "./types";
import { Marshallers, OutputHandlers } from "./util";
import minimist from "minimist";

/**
 * Generates a command object based upon the arguments provided in the command line
 *
 * @param context a custom command context, which will be available in operation logic
 */
export const getBaseCommand = <CtxType>(
  context?: CtxType
): Command<CtxType> => {
  // Grab base args
  const argv = minimist(process.argv.slice(2));

  // Build extras
  const ctxExtras = context ? context : ({} as CtxType);

  return getBaseCommandWithContext({ ...ctxExtras, argv });
};

const getBaseCommandWithContext = <CtxType>(
  ctx: CommandContext<CtxType>
): Command<CtxType> => {
  let args = ctx.argv._;
  const cmd = args.shift();

  if (!cmd) throw "No command specified";

  return { cmd, args, ctx };
};

/**
 * Runs the command specified by the command object, using a command map for operation definitions.
 *
 * @param command a command object
 * @param cmdMap the map of operations upon which to apply the command
 */
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

/**
 * Creates a new command from an existing command by popping the next strong from the available arguments.
 *
 * @param command the command from which to build a new command.
 */
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

/**
 * Helper function based on operateForCommand which also calls popCommand.  Used for nested command maps.
 *
 * @param command a command object from which to create a new command
 * @param cmdMap a command map upon which to operate
 */
export const popAndOperate = async <CtxType>(
  command: Command<CtxType>,
  cmdMap: CommandMap<CtxType>
) => operateForCommand(popCommand(command), cmdMap);

/**
 * Helper function which gets the base command and runs it agains a given command map, taking in an optional custom context
 *
 * @param cmdMap a command map upon which to operate
 * @param context a custom command context, which will be available in operation logic
 */
export const operateForBaseCommand = async <CtxType>(
  cmdMap: CommandMap<CtxType>,
  context?: CtxType
) => operateForCommand(getBaseCommand(context), cmdMap);

/**
 * Helper function which handles running the base command against a given command map, then writes the output to the correct destination.
 * @param cmdMap a command map upon which to operate
 * @param context a custom command context, which will be available in operation logic
 */
export const handleCommand = async <CtxType>(
  cmdMap: CommandMap<CtxType>,
  context?: CtxType
) => OutputHandlers.base(await operateForBaseCommand(cmdMap, context));
