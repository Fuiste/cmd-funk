import { Command, CommandMap, CommandContext } from "./types";
import minimist from "minimist";
export declare const getArgv: () => minimist.ParsedArgs;
export declare const getBaseCommand: <CtxType>(context?: CtxType | undefined) => Command<CtxType>;
export declare const getBaseCommandWithContext: <CtxType>(ctx: CommandContext<CtxType>) => Command<CtxType>;
export declare const operateForCommand: <CtxType>(command: Command<CtxType>, cmdMap: CommandMap<CtxType>) => Promise<import("./types").CommandOutput>;
export declare const popCommand: <CtxType>(command: Command<CtxType>) => Command<CtxType>;
export declare const popAndOperate: <CtxType>(command: Command<CtxType>, cmdMap: CommandMap<CtxType>) => Promise<import("./types").CommandOutput>;
