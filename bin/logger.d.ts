import { CommandOutput } from "./types";
export declare namespace Logger {
    const sayHello: <CtxType>(ctx: import("./types").CommandContext<CtxType>) => void;
    const printToConsole: (output: CommandOutput) => void;
    const progress: <CtxType>(prog: string, ctx: import("./types").CommandContext<CtxType>) => void;
    const important: <CtxType>(log: string, ctx: import("./types").CommandContext<CtxType>) => void;
}
