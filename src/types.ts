import minimist from "minimist";

// Base types
export type Command<T> = {
  cmd: string;
  args: string[];
  ctx: CommandContext<T>;
};

export type CommandContext<T> = T & {
  argv: minimist.ParsedArgs;
};

export type CommandMap<T> = {
  [key: string]: (c: Command<T>) => CommandOutput | Promise<CommandOutput>;
  help: () => CommandOutput;
};

export type CommandOutput = {
  raw: any;
  console: string;
  error?: boolean;
};

export type OperatorFunction<Output, T> = (cmd: Command<T>) => Promise<Output>;

// Helper types
export type SimpleCommand = Command<{}>;

export type SimpleCommandContext = CommandContext<{}>;

export type SimpleCommandMap = CommandMap<{}>;

export type SimpleOperatorFunction<Output> = OperatorFunction<Output, {}>;
