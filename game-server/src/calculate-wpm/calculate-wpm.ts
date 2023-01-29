/**
 * 
 * @param time_elapsed time in seconds calculated from when the race starts
 * @param chars_num this increases every time checkInput returns true
 * @returns wpm
 */

export function calculateWPM(time_elapsed: number, chars_num: number):number{

    return Math.round((chars_num/5)/(time_elapsed/60));
}