"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMatch = void 0;
var race_1 = require("./race");
var PLAYERS_PER_RACE = 1;
var matchmakingPlayers = [];
var findMatch = function (player) {
    console.log("finding a match");
    matchmakingPlayers.push(player);
    if (matchmakingPlayers.length === PLAYERS_PER_RACE) {
        // create a new race for the matchmaking players
        new race_1.MultiplayerRace(__spreadArray([], matchmakingPlayers, true));
        // now all the players have found a match, empty the matchmaking players array
        matchmakingPlayers = [];
    }
};
exports.findMatch = findMatch;
