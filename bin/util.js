"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var fs_1 = __importDefault(require("fs"));
var logger_1 = require("./logger");
var Argparsers;
(function (Argparsers) {
    Argparsers.silent = function (argv) { return !!argv["silent"]; };
    Argparsers.shouldWriteRaw = function (argv) {
        return !!argv["outFile"];
    };
    Argparsers.shouldPrintToConsole = function (argv) {
        return !argv["outFile"];
    };
    Argparsers.getOutFilePath = function (argv) {
        return argv["outFile"];
    };
})(Argparsers = exports.Argparsers || (exports.Argparsers = {}));
var FileOperations;
(function (FileOperations) {
    FileOperations.writeRawToFile = function (res, ctx) {
        logger_1.Logger.progress("Writing output to " + Argparsers.getOutFilePath(ctx.argv), ctx);
        fs_1.default.writeFileSync(Argparsers.getOutFilePath(ctx.argv), JSON.stringify(res.raw), "utf-8");
        logger_1.Logger.progress("Success!", ctx);
    };
})(FileOperations = exports.FileOperations || (exports.FileOperations = {}));
var Marshallers;
(function (Marshallers) {
    Marshallers.error = function (error, cmd) { return ({
        raw: null,
        error: true,
        console: Typeface.error(Typeface.makeColumns({
            Error: error,
            Command: cmd ? cmd : "Unknown",
        })),
    }); };
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