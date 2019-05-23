import { CommandOutput } from "./types";
import minimist from "minimist";
export declare namespace Argparsers {
    const silent: (argv: minimist.ParsedArgs) => boolean;
    const shouldWriteRaw: (argv: minimist.ParsedArgs) => boolean;
    const shouldPrintToConsole: (argv: minimist.ParsedArgs) => boolean;
    const getOutFilePath: (argv: minimist.ParsedArgs) => string;
}
export declare namespace FileOperations {
    const writeRawToFile: <CtxType>(res: CommandOutput, ctx: import("./types").CommandContext<CtxType>) => void;
}
export declare namespace Marshallers {
    const error: (error: string, cmd?: string | undefined) => CommandOutput;
    const help: (cmdMap: {
        [cmd: string]: string;
    }) => CommandOutput;
}
export declare namespace Typeface {
    const progress: (s: string) => string;
    const error: (s: string) => string;
    const success: (s: string) => string;
    const base: (s: string) => string;
    const bold: (s: string) => string;
    const makeColumns: (colMap: {
        [key: string]: string;
    }) => string;
}
