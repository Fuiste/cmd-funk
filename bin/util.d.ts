import { CommandOutput } from "./types";
import minimist from "minimist";
export declare namespace OutputHandlers {
    /**
     * Default command output handler function
     *
     * @param res a command response
     */
    const base: (res: CommandOutput) => void;
}
/**
 * Argument parser helpers
 */
export declare namespace ArgParsers {
    /**
     * Wrapper for minimist argument parser.
     */
    const getArgv: () => minimist.ParsedArgs;
    /**
     * Is the --silent flag present?
     */
    const silent: () => boolean;
    /**
     * Returns true iff the requested flag exists in the CLI args
     *
     * @param flag the flag to check
     */
    const hasFlag: (flag: string) => boolean;
    /**
     * Is the --outFile flag present?
     */
    const shouldWriteRaw: () => boolean;
    /**
     * Should the CLI output to the command line?
     */
    const shouldPrintToConsole: () => boolean;
    /**
     * Gets the path specified in the --outfile flag
     */
    const getOutFilePath: () => string;
}
/**
 * File I/O operations
 */
export declare namespace FileOperations {
    /**
     * Writes the raw response from a command to the desired file.
     *
     * @param res a command response
     */
    const writeRawToFile: (res: CommandOutput) => void;
}
/**
 * Console marshallers
 */
export declare namespace Marshallers {
    /**
     * Marshalls an error into a command response
     *
     * @param error an error message
     * @param cmd the optional command from which this error spawned
     */
    const error: (error: string, cmd?: string | undefined) => CommandOutput;
    /**
     * Marshalls command map help text to an output
     *
     * @param cmdMap a map of commands to help text
     */
    const help: (cmdMap: {
        [cmd: string]: string;
    }) => CommandOutput;
}
/**
 * Typeface helpers
 */
export declare namespace Typeface {
    const progress: (s: string) => string;
    const error: (s: string) => string;
    const success: (s: string) => string;
    const base: (s: string) => string;
    const bold: (s: string) => string;
    /**
     * Makes a column representation of a key/value dictionary for easy printing to console
     *
     * @param colMap a map of keys and values to columnize
     */
    const makeColumns: (colMap: {
        [key: string]: string;
    }) => string;
}
