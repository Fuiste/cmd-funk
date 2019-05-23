import minimist from "minimist";

export type Command = {
  cmd: string;
  args: string[];
  ctx: CommandContext;
};

export type CommandContext = {
  [key: string]: any;
  argv: minimist.ParsedArgs;
};

export type CommandContextConstants = {
  gqlApi: string;
  awsRegion: string;
};

export type CommandMap = {
  [key: string]: (c: Command) => CommandOutput | Promise<CommandOutput>;
  help: () => CommandOutput;
};

export type CommandOutput = {
  raw: any;
  console: string;
  error?: boolean;
};

export type OperatorFunction<Output> = (cmd: Command) => Promise<Output>;
