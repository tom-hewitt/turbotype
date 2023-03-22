"use strict";
exports.__esModule = true;
exports.calculate_WPM = void 0;
/**
 *
 * @param seconds_elapsed time in seconds calculated from when the race starts
 * @param character_count the number of characters typed over the given time period
 * @returns wpm
 */
function calculate_WPM(seconds_elapsed, character_count) {
    var word_count = character_count / 5;
    var minutes_elapsed = seconds_elapsed / 60;
    return word_count / minutes_elapsed;
}
exports.calculate_WPM = calculate_WPM;
