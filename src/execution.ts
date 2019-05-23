import { Command, CommandMap } from "./types/command";
import { Marshallers } from "./util/marshallers";
import minimist from "minimist";

export namespace Execution {
  export const operateForCommand = async (
    command: Command,
    cmdMap: CommandMap
  ) => {
    if (!cmdMap[command.cmd])
      return Marshallers.error("Invalid command", command.cmd);

    try {
      return await cmdMap[command.cmd](command);
    } catch (e) {
      return Marshallers.error(e, command.cmd);
    }
  };

  export const getBaseCommand = async (context?: {
    [key: string]: any;
  }): Promise<Command> => {
    // Grab base args
    const argv = minimist(process.argv.slice(2));

    let args = argv._;
    const cmd = args.shift();
    const ctx = { ...context, argv };

    if (!cmd) throw "No command specified";

    return { cmd, args, ctx };
  };

  export const popCommand = (command: Command): Command => {
    if (command.args.length < 1) throw "Must specify a command";
    const cmd = command.args.shift();

    // This should never happen
    if (cmd === undefined) throw "Command cannot be undefined";

    return {
      cmd,
      args: command.args,
      ctx: command.ctx,
    };
  };
}
