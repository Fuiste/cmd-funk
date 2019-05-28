import minimist from "minimist";
export declare type Command<CtxType> = {
    cmd: string;
    args: string[];
    ctx: CommandContext<CtxType>;
};
export declare type CommandContext<CtxType> = CtxType & {
    argv: minimist.ParsedArgs;
};
export declare type CommandMap<CtxType> = {
    [key: string]: (c: Command<CtxType>) => CommandOutput | Promise<CommandOutput>;
    help: () => CommandOutput<null>;
};
export declare type CommandOutput<Output = any> = {
    raw: Output;
    console: string;
    error?: boolean;
};
export declare type OperatorFunction<Output, CtxType> = (cmd: Command<CtxType>) => Promise<Output>;
export declare type SimpleCommand = Command<{}>;
export declare type SimpleCommandContext = CommandContext<{}>;
export declare type SimpleCommandMap = CommandMap<{}>;
export declare type SimpleOperatorFunction<Output> = OperatorFunction<Output, {}>;
