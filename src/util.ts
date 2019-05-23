import { CommandOutput } from "./types";
import chalk from "chalk";
import fs from "fs";
import { Logger } from "./logger";
import minimist from "minimist";

export namespace OutputHandlers {
  export const base = async (res: CommandOutput) => {
    if (ArgParsers.shouldPrintToConsole()) Logger.printToConsole(res);
    if (ArgParsers.shouldWriteRaw()) FileOperations.writeRawToFile(res);
  };
}

export namespace ArgParsers {
  /**
   * Wrapper for minimist argument parser.
   */
  export const getArgv = (): minimist.ParsedArgs =>
    minimist(process.argv.slice(2));

  /**
   * Is the --silent flag present?
   */
  export const silent = () => !!getArgv()["silent"];

  /**
   * Is the --outFile flag present?
   */
  export const shouldWriteRaw = () => !!getArgv()["outFile"];

  /**
   * Should the CLI output to the command line?
   */
  export const shouldPrintToConsole = () => !getArgv()["outFile"];

  /**
   * Gets the path specified in the --outfile flag
   */
  export const getOutFilePath = () => getArgv()["outFile"] as string;
}

export namespace FileOperations {
  /**
   * Writes the raw response from a command to the desired file.
   *
   * @param res a command response
   */
  export const writeRawToFile = (res: CommandOutput) => {
    Logger.debug(`Writing output to ${ArgParsers.getOutFilePath()}`);
    fs.writeFileSync(
      ArgParsers.getOutFilePath(),
      JSON.stringify(res.raw),
      "utf-8"
    );
    Logger.debug("Success!");
  };
}

export namespace Marshallers {
  /**
   * Marshalls an error into a command response
   *
   * @param error an error message
   * @param cmd the optional command from which this error spawned
   */
  export const error = (error: string, cmd?: string): CommandOutput => ({
    raw: null,
    error: true,
    console: Typeface.error(
      Typeface.makeColumns({
        Error: error,
        Command: cmd ? cmd : "Unknown",
      })
    ),
  });

  /**
   * Marshalls command map help text to an output
   *
   * @param cmdMap a map of commands to help text
   */
  export const help = (cmdMap: { [cmd: string]: string }): CommandOutput => ({
    raw: null,
    console: Typeface.base(
      "Available commands:\n\n" + Typeface.makeColumns(cmdMap)
    ),
  });
}

export namespace Typeface {
  export const progress = (s: string) => chalk.dim(s);

  export const error = (s: string) => chalk.redBright(s);

  export const success = (s: string) => chalk.green(s);

  export const base = (s: string) => chalk.blue(s);

  export const bold = (s: string) => chalk.bold(s);

  /**
   * Makes a column representation of a key/value dictionary for easy printing to console
   *
   * @param colMap a map of keys and values to columnize
   */
  export const makeColumns = (colMap: { [key: string]: string }) => {
    const longestKey = Object.keys(colMap).reduce((a, b) =>
      a.length > b.length ? a : b
    ).length;

    return Object.keys(colMap)
      .map(k => `${bold(k)}${" ".repeat(longestKey - k.length)} ${colMap[k]}\n`)
      .join("");
  };
}
