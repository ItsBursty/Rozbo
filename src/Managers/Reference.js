"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pauseTime = exports.dataPath = void 0;
const os_1 = __importDefault(require("os"));
exports.dataPath = os_1.default.homedir() + "\\bursty-training\\data.json";
exports.pauseTime = 1;
