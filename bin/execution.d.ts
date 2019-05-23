import { Command, CommandMap } from "./types";
export declare namespace Execution {
    const operateForCommand: (command: Command, cmdMap: CommandMap) => Promise<import("./types").CommandOutput>;
    const getBaseCommand: (context?: {
        [key: string]: any;
    } | undefined) => Promise<Command>;
    const popCommand: (command: Command) => Command;
}
