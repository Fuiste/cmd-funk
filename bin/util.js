"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var fs_1 = __importDefault(require("fs"));
var logger_1 = require("./logger");
var minimist_1 = __importDefault(require("minimist"));
var Argparsers;
(function (Argparsers) {
    /**
     * Wrapper for minimist argument parser.
     */
    Argparsers.getArgv = function () {
        return minimist_1.default(process.argv.slice(2));
    };
    /**
     * Is the --silent flag present?
     */
    Argparsers.silent = function () { return !!Argparsers.getArgv()["silent"]; };
    /**
     * Is the --outFile flag present?
     */
    Argparsers.shouldWriteRaw = function () { return !!Argparsers.getArgv()["outFile"]; };
    /**
     * Should the CLI output to the command line?
     */
    Argparsers.shouldPrintToConsole = function () { return !Argparsers.getArgv()["outFile"]; };
    /**
     * Gets the path specified in the --outfile flag
     */
    Argparsers.getOutFilePath = function () { return Argparsers.getArgv()["outFile"]; };
})(Argparsers = exports.Argparsers || (exports.Argparsers = {}));
var FileOperations;
(function (FileOperations) {
    /**
     * Writes the raw response from a command to the desired file.
     *
     * @param res a command response
     */
    FileOperations.writeRawToFile = function (res) {
        logger_1.Logger.debug("Writing output to " + Argparsers.getOutFilePath());
        fs_1.default.writeFileSync(Argparsers.getOutFilePath(), JSON.stringify(res.raw), "utf-8");
        logger_1.Logger.debug("Success!");
    };
})(FileOperations = exports.FileOperations || (exports.FileOperations = {}));
var Marshallers;
(function (Marshallers) {
    /**
     * Marshalls an error into a command response
     *
     * @param error an error message
     * @param cmd the optional command from which this error spawned
     */
    Marshallers.error = function (error, cmd) { return ({
        raw: null,
        error: true,
        console: Typeface.error(Typeface.makeColumns({
            Error: error,
            Command: cmd ? cmd : "Unknown",
        })),
    }); };
    /**
     * Marshalls command map help text to an output
     *
     * @param cmdMap a map of commands to help text
     */
    Marshallers.help = function (cmdMap) { return ({
        raw: null,
        console: Typeface.base("Available commands:\n\n" + Typeface.makeColumns(cmdMap)),
    }); };
})(Marshallers = exports.Marshallers || (exports.Marshallers = {}));
var Typeface;
(function (Typeface) {
    Typeface.progress = function (s) { return chalk_1.default.dim(s); };
    Typeface.error = function (s) { return chalk_1.default.redBright(s); };
    Typeface.success = function (s) { return chalk_1.default.green(s); };
    Typeface.base = function (s) { return chalk_1.default.blue(s); };
    Typeface.bold = function (s) { return chalk_1.default.bold(s); };
    /**
     * Makes a column representation of a key/value dictionary for easy printing to console
     *
     * @param colMap a map of keys and values to columnize
     */
    Typeface.makeColumns = function (colMap) {
        var longestKey = Object.keys(colMap).reduce(function (a, b) {
            return a.length > b.length ? a : b;
        }).length;
        return Object.keys(colMap)
            .map(function (k) { return "" + Typeface.bold(k) + " ".repeat(longestKey - k.length) + " " + colMap[k] + "\n"; })
            .join("");
    };
})(Typeface = exports.Typeface || (exports.Typeface = {}));
//# sourceMappingURL=util.js.map