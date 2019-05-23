import { Argparsers as Args, Typeface } from "./util";
import { CommandOutput, Command } from "./types";
import chalk from "chalk";
import figlet from "figlet";

export namespace Logger {
  export const sayHello = <CtxType>(ctx: Command<CtxType>["ctx"]) => {
    if (!Args.silent(ctx.argv))
      console.log(chalk.blue(figlet.textSync("HMI CLI", "Larry 3D")));
  };

  export const printToConsole = (output: CommandOutput) => {
    const status = output.error
      ? Typeface.error("Error!")
      : Typeface.success("Success!");

    console.log(`${Typeface.bold(status)}\n\n${output.console}`);
  };

  export const progress = <CtxType>(
    prog: string,
    ctx: Command<CtxType>["ctx"]
  ) => {
    if (!Args.silent(ctx.argv)) console.log(Typeface.progress(prog));
  };

  export const important = <CtxType>(
    log: string,
    ctx: Command<CtxType>["ctx"]
  ) => console.log(Typeface.base(log));
}
