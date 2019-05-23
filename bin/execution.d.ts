import { Command, CommandMap } from "./types";
/**
 * Generates a command object based upon the arguments provided in the command line.
 *
 * @param context a custom command context, which will be available in operation logic.
 */
export declare const getBaseCommand: <CtxType>(context?: CtxType | undefined) => Command<CtxType>;
/**
 * Runs the command specified by the command object, using a command map for operation definitions.
 *
 * @param command a command object
 * @param cmdMap the map of operations upon which to apply the command
 */
export declare const operateForCommand: <CtxType>(command: Command<CtxType>, cmdMap: CommandMap<CtxType>) => Promise<import("./types").CommandOutput>;
/**
 * Creates a new command from an existing command by popping the next strong from the available arguments.
 *
 * @param command the command from which to build a new command.
 */
export declare const popCommand: <CtxType>(command: Command<CtxType>) => Command<CtxType>;
/**
 * Helper function based on operateForCommand which also calls popCommand.  Used for nested command maps.
 *
 * @param command a command object from which to create a new command
 * @param cmdMap a command map upon which to operate
 */
export declare const popAndOperate: <CtxType>(command: Command<CtxType>, cmdMap: CommandMap<CtxType>) => Promise<import("./types").CommandOutput>;
