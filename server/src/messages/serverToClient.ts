export type MessageToClient =
  | WordListMessage
  | CorrectWordMessage
  | IncorrectLetterMessage;

export enum MessageToClientType {
  WORD_LIST = 0,
  CORRECT_WORD = 1,
  INCORRECT_LETTER = 2,
}

/**
 * [type, ...list]
 */
export type WordListMessage = [MessageToClientType.WORD_LIST, ...string[]];

export const wordListMessage = (list: string[]): WordListMessage => [
  MessageToClientType.WORD_LIST,
  ...list,
];

/**
 * [type, playerID]
 */
export type CorrectWordMessage = [MessageToClientType.CORRECT_WORD, number];

export const correctWordMessage = (playerID: number): CorrectWordMessage => [
  MessageToClientType.CORRECT_WORD,
  playerID,
];

/**
 * [type, playerID]
 */
export type IncorrectLetterMessage = [
  MessageToClientType.INCORRECT_LETTER,
  number
];

export const incorrectLetterMessage = (playerID: number) => [
  MessageToClientType.INCORRECT_LETTER,
  playerID,
];
