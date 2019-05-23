import { Command, CommandMap } from "./types";
export declare const getBaseCommand: (context?: {
    [key: string]: any;
} | undefined) => Promise<Command>;
export declare const operateForCommand: (command: Command, cmdMap: CommandMap) => Promise<import("./types").CommandOutput>;
export declare const popCommand: (command: Command) => Command;
export declare const popAndOperate: (command: Command, cmdMap: CommandMap) => Promise<import("./types").CommandOutput>;
