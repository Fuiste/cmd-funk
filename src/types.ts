import minimist from "minimist";

// Base types
export type Command<CtxType> = {
  cmd: string;
  args: string[];
  ctx: CommandContext<CtxType>;
};

export type CommandContext<CtxType> = CtxType & {
  argv: minimist.ParsedArgs;
};

export type CommandMap<CtxType> = {
  [key: string]: (
    c: Command<CtxType>
  ) => CommandOutput | Promise<CommandOutput>;
  help: () => CommandOutput<null>;
};

export type CommandOutput<Output = any> = {
  raw: Output;
  console: string;
  error?: boolean;
};

export type OperatorFunction<Output, CtxType> = (
  cmd: Command<CtxType>
) => Promise<Output>;

// Helper types
export type SimpleCommand = Command<{}>;

export type SimpleCommandContext = CommandContext<{}>;

export type SimpleCommandMap = CommandMap<{}>;

export type SimpleOperatorFunction<Output> = OperatorFunction<Output, {}>;
