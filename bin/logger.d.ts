import { CommandOutput } from "./types";
export declare namespace Logger {
    /**
     * Writes an ascii art message to the console
     *
     * @param message a message to display
     */
    const greet: (message: string) => void;
    /**
     * Prints the result of a command to the console
     *
     * @param output a commans output
     */
    const printToConsole: (output: CommandOutput) => void;
    const debug: (message: string) => void;
    const info: (message: string) => void;
    const warn: (message: string) => void;
}
