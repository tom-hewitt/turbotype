"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.__esModule = true;
exports.MultiplayerRace = void 0;
var messages_1 = require("./messages");
var game_1 = require("@turbotype/game");
var msgpack_1 = require("@msgpack/msgpack");
var database_1 = require("./database");
var COUNTDOWN_SECONDS = 5;
var WORD_COUNT = 25;
var MultiplayerRace = /** @class */ (function () {
    function MultiplayerRace(users) {
        var _this = this;
        // maps the indexes of the players that have finished to their finish time
        this.finishedPlayers = new Map();
        // the start time is the current time in ms + the countdown time in ms
        this.startTime = Date.now() + COUNTDOWN_SECONDS * 1000;
        // generate the random wordlist when the race is created
        this.wordList = (0, game_1.randomWords)(WORD_COUNT);
        this.handleKeyInput = function (key, index) {
            console.log("received key input:", key);
            if (!_this.hasStarted()) {
                return;
            }
            var player = _this.players[index];
            if (!player) {
                throw new Error("Can't find player ".concat(index));
            }
            // work out the new state, and any new action that has occured
            var _a = (0, game_1.applyKeyInput)(player.state, key, _this.wordList), state = _a.state, action = _a.action;
            player.state = state;
            if (action !== undefined) {
                console.log("action for player", index, ":", ["correct letter", "incorrect letter", "correct word"][action]);
                // if a new action occured, broadcast it to all the clients
                _this.players.forEach(function (player) {
                    return sendActionMessage(player, index, action);
                });
            }
            // check if the player has finished
            if (state === null) {
                // set the finish time
                _this.finishedPlayers.set(index, Date.now() - _this.startTime);
                // check if all the players have finished
                if (_this.finishedPlayers.size === _this.players.length) {
                    _this.endRace();
                }
            }
        };
        this.hasStarted = function () {
            return _this.startTime !== null && _this.startTime < Date.now();
        };
        this.endRace = function () { return __awaiter(_this, void 0, void 0, function () {
            var chars, ids, times, raceID;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chars = this.wordList.reduce(function (sum, word) { return sum + word.length; }, 0);
                        ids = this.players.map(function (player) { return player.id; });
                        times = this.players.map(function (_, index) {
                            return _this.finishedPlayers.get(index);
                        });
                        return [4 /*yield*/, (0, database_1.addSummaryToDatabase)(chars, ids, times)];
                    case 1:
                        raceID = _a.sent();
                        console.log("sending race ID:", raceID);
                        this.players.forEach(function (player) { return sendFinishMessage(player, raceID); });
                        this.players.forEach(function (player) { return player.socket.removeAllListeners(); });
                        return [2 /*return*/];
                }
            });
        }); };
        console.log("creating a new race with players:", users.map(function (user) { return user.id; }));
        // convert the users to players by adding giving each one a typing state
        this.players = users.map(function (user) { return (__assign(__assign({}, user), { state: {
                word: _this.wordList[0],
                wordIndex: 0,
                characterIndex: 0,
                incorrectCharacterCount: 0,
                events: []
            } })); });
        var playerColors = users.map(function (user) { return user.color; });
        // send the connect message to each player
        this.players.forEach(function (player, index) {
            return sendConnectMessage(player, index, _this.startTime, _this.players.length, playerColors, _this.wordList);
        });
        // listen for key input from each player
        this.players.forEach(function (player, index) {
            player.socket.on("message", function (message) {
                return _this.handleKeyInput(message.toString(), index);
            });
        });
    }
    return MultiplayerRace;
}());
exports.MultiplayerRace = MultiplayerRace;
/**
 * encodes and sends a message to the given socket
 * @param socket
 * @param message
 */
var sendMessage = function (socket, message) {
    socket.send((0, msgpack_1.encode)(message));
};
var sendConnectMessage = function (user, index, startTime, playerCount, playerColors, wordList) {
    var message = [
        messages_1.ServerToClientMessageType.CONNECT,
        wordList,
        index,
        startTime,
        playerCount,
        playerColors,
    ];
    sendMessage(user.socket, message);
};
var sendActionMessage = function (user, index, action) {
    var message = [
        messages_1.ServerToClientMessageType.ACTION,
        index,
        action,
    ];
    sendMessage(user.socket, message);
};
var sendFinishMessage = function (user, raceID) {
    var message = [messages_1.ServerToClientMessageType.FINISHED, raceID];
    sendMessage(user.socket, message);
};
