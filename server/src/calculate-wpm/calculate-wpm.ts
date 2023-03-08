/**
 *
 * @param seconds_elapsed time in seconds calculated from when the race starts
 * @param character_count the number of characters typed over the given time period
 * @returns wpm
 */
export function calculate_WPM(
  seconds_elapsed: number,
  character_count: number
): number {
  const word_count = character_count / 5;
  const minutes_elapsed = seconds_elapsed / 60;

  return word_count / minutes_elapsed;
}
