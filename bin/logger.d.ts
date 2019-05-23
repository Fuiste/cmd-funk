import { CommandOutput } from "./types";
export declare namespace Logger {
    const greet: (message: string) => void;
    const printToConsole: (output: CommandOutput) => void;
    const debug: (message: string) => void;
    const info: (message: string) => void;
    const warn: (message: string) => void;
}
