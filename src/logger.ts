import { ArgParsers as Args, Typeface } from "./util";
import { CommandOutput, Command } from "./types";
import chalk from "chalk";
import figlet from "figlet";

export namespace Logger {
  /**
   * Writes an ascii art message to the console
   *
   * @param message a message to display
   */
  export const greet = (message: string) => {
    if (!Args.silent())
      console.log(chalk.blue(figlet.textSync(message, "Larry 3D")));
  };

  /**
   * Prints the result of a command to the console
   *
   * @param output a commans output
   */
  export const printToConsole = (output: CommandOutput) => {
    const status = output.error
      ? Typeface.error("Error!")
      : Typeface.success("Success!");

    console.log(`${Typeface.bold(status)}\n\n${output.console}`);
  };

  export const debug = (message: string) => {
    if (!Args.silent()) console.log(Typeface.progress(message));
  };

  export const info = (message: string) => console.log(Typeface.base(message));

  export const warn = (message: string) => console.log(Typeface.error(message));
}
