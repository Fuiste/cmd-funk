import minimist from "minimist";

export type Command<T = {}> = {
  cmd: string;
  args: string[];
  ctx: CommandContext<T>;
};

export type CommandContext<T = {}> = T & {
  argv: minimist.ParsedArgs;
};

export type CommandMap<T = {}> = {
  [key: string]: (c: Command<T>) => CommandOutput | Promise<CommandOutput>;
  help: () => CommandOutput;
};

export type CommandOutput = {
  raw: any;
  console: string;
  error?: boolean;
};

export type OperatorFunction<Output, T = {}> = (
  cmd: Command<T>
) => Promise<Output>;
