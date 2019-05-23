"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
var chalk_1 = __importDefault(require("chalk"));
var figlet_1 = __importDefault(require("figlet"));
var Logger;
(function (Logger) {
    Logger.sayHello = function (ctx) {
        if (!util_1.Argparsers.silent(ctx.argv))
            console.log(chalk_1.default.blue(figlet_1.default.textSync("HMI CLI", "Larry 3D")));
    };
    Logger.printToConsole = function (output) {
        var status = output.error
            ? util_1.Typeface.error("Error!")
            : util_1.Typeface.success("Success!");
        console.log(util_1.Typeface.bold(status) + "\n\n" + output.console);
    };
    Logger.progress = function (prog, ctx) {
        if (!util_1.Argparsers.silent(ctx.argv))
            console.log(util_1.Typeface.progress(prog));
    };
    Logger.important = function (log, ctx) { return console.log(util_1.Typeface.base(log)); };
})(Logger = exports.Logger || (exports.Logger = {}));
//# sourceMappingURL=logger.js.map