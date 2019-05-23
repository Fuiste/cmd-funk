import { CommandOutput, Command } from "./types";
import chalk from "chalk";
import fs from "fs";
import minimist from "minimist";
import { Logger } from "./logger";

export namespace Argparsers {
  export const silent = (argv: minimist.ParsedArgs) => !!argv["silent"];

  export const shouldWriteRaw = (argv: minimist.ParsedArgs) =>
    !!argv["outFile"];

  export const shouldPrintToConsole = (argv: minimist.ParsedArgs) =>
    !argv["outFile"];

  export const getOutFilePath = (argv: minimist.ParsedArgs) =>
    argv["outFile"] as string;
}

export namespace FileOperations {
  export const writeRawToFile = <CtxType>(
    res: CommandOutput,
    ctx: Command<CtxType>["ctx"]
  ) => {
    Logger.progress(
      `Writing output to ${Argparsers.getOutFilePath(ctx.argv)}`,
      ctx
    );
    fs.writeFileSync(
      Argparsers.getOutFilePath(ctx.argv),
      JSON.stringify(res.raw),
      "utf-8"
    );
    Logger.progress("Success!", ctx);
  };
}

export namespace Marshallers {
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

  export const makeColumns = (colMap: { [key: string]: string }) => {
    const longestKey = Object.keys(colMap).reduce((a, b) =>
      a.length > b.length ? a : b
    ).length;

    return Object.keys(colMap)
      .map(k => `${bold(k)}${" ".repeat(longestKey - k.length)} ${colMap[k]}\n`)
      .join("");
  };
}
