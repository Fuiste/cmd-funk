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
    /**
     * Writes an ascii art message to the console
     *
     * @param message a message to display
     */
    Logger.greet = function (message) {
        if (!util_1.ArgParsers.silent())
            console.log(chalk_1.default.blue(figlet_1.default.textSync(message, "Larry 3D")));
    };
    /**
     * Prints the result of a command to the console
     *
     * @param output a commans output
     */
    Logger.printToConsole = function (output) {
        var status = output.error
            ? util_1.Typeface.error("Error!")
            : util_1.Typeface.success("Success!");
        console.log(util_1.Typeface.bold(status) + "\n\n" + output.console);
    };
    Logger.debug = function (message) {
        if (!util_1.ArgParsers.silent())
            console.log(util_1.Typeface.progress(message));
    };
    Logger.info = function (message) { return console.log(util_1.Typeface.base(message)); };
    Logger.warn = function (message) { return console.log(util_1.Typeface.error(message)); };
})(Logger = exports.Logger || (exports.Logger = {}));
//# sourceMappingURL=logger.js.map