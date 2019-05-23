"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var fs_1 = __importDefault(require("fs"));
var logger_1 = require("./logger");
var minimist_1 = __importDefault(require("minimist"));
var OutputHandlers;
(function (OutputHandlers) {
    var _this = this;
    OutputHandlers.base = function (res) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (ArgParsers.shouldPrintToConsole())
                logger_1.Logger.printToConsole(res);
            if (ArgParsers.shouldWriteRaw())
                FileOperations.writeRawToFile(res);
            return [2 /*return*/];
        });
    }); };
})(OutputHandlers = exports.OutputHandlers || (exports.OutputHandlers = {}));
var ArgParsers;
(function (ArgParsers) {
    /**
     * Wrapper for minimist argument parser.
     */
    ArgParsers.getArgv = function () {
        return minimist_1.default(process.argv.slice(2));
    };
    /**
     * Is the --silent flag present?
     */
    ArgParsers.silent = function () { return !!ArgParsers.getArgv()["silent"]; };
    /**
     * Is the --outFile flag present?
     */
    ArgParsers.shouldWriteRaw = function () { return !!ArgParsers.getArgv()["outFile"]; };
    /**
     * Should the CLI output to the command line?
     */
    ArgParsers.shouldPrintToConsole = function () { return !ArgParsers.getArgv()["outFile"]; };
    /**
     * Gets the path specified in the --outfile flag
     */
    ArgParsers.getOutFilePath = function () { return ArgParsers.getArgv()["outFile"]; };
})(ArgParsers = exports.ArgParsers || (exports.ArgParsers = {}));
var FileOperations;
(function (FileOperations) {
    /**
     * Writes the raw response from a command to the desired file.
     *
     * @param res a command response
     */
    FileOperations.writeRawToFile = function (res) {
        logger_1.Logger.debug("Writing output to " + ArgParsers.getOutFilePath());
        fs_1.default.writeFileSync(ArgParsers.getOutFilePath(), JSON.stringify(res.raw), "utf-8");
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