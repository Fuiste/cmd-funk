import minimist from "minimist";
export declare type Command<T> = {
    cmd: string;
    args: string[];
    ctx: CommandContext<T>;
};
export declare type CommandContext<T> = T & {
    argv: minimist.ParsedArgs;
};
export declare type CommandMap<T> = {
    [key: string]: (c: Command<T>) => CommandOutput | Promise<CommandOutput>;
    help: () => CommandOutput;
};
export declare type CommandOutput = {
    raw: any;
    console: string;
    error?: boolean;
};
export declare type OperatorFunction<Output, T> = (cmd: Command<T>) => Promise<Output>;
export declare type SimpleCommand = Command<{}>;
export declare type SimpleCommandContext = CommandContext<{}>;
export declare type SimpleCommandMap = CommandMap<{}>;
export declare type SimpleOperatorFunction<Output> = OperatorFunction<Output, {}>;
