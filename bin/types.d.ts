import minimist from "minimist";
export declare type Command = {
    cmd: string;
    args: string[];
    ctx: CommandContext;
};
export declare type CommandContext = {
    [key: string]: any;
    argv: minimist.ParsedArgs;
};
export declare type CommandContextConstants = {
    gqlApi: string;
    awsRegion: string;
};
export declare type CommandMap = {
    [key: string]: (c: Command) => CommandOutput | Promise<CommandOutput>;
    help: () => CommandOutput;
};
export declare type CommandOutput = {
    raw: any;
    console: string;
    error?: boolean;
};
export declare type OperatorFunction<Output> = (cmd: Command) => Promise<Output>;
