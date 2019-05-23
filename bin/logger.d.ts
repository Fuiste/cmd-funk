import { CommandOutput } from "./types";
export declare namespace Logger {
    const sayHello: (ctx: import("./types").CommandContext) => void;
    const printToConsole: (output: CommandOutput) => void;
    const progress: (prog: string, ctx: import("./types").CommandContext) => void;
    const important: (log: string, ctx: import("./types").CommandContext) => void;
}
