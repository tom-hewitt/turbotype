"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerToClientMessageType = void 0;
var ServerToClientMessageType;
(function (ServerToClientMessageType) {
    ServerToClientMessageType[ServerToClientMessageType["CONNECT"] = 0] = "CONNECT";
    ServerToClientMessageType[ServerToClientMessageType["ACTION"] = 1] = "ACTION";
    ServerToClientMessageType[ServerToClientMessageType["FINISHED"] = 2] = "FINISHED";
})(ServerToClientMessageType = exports.ServerToClientMessageType || (exports.ServerToClientMessageType = {}));
