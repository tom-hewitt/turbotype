import { randomWord } from "./wordGeneration";

export interface GameClient {
  onNewWord: (word: string) => void;
}

const COUNTDOWN_DURATION = 3;

const BASE_SPEED = 10;

const SPEED_BOOST_AMOUNT = 20;
const SPEED_PENALTY_AMOUNT = 5;
const SPEED_RECOVERY_RATE = 1;

export class GameServer {
  client: GameClient;

  started = false;

  progress = 0;
  speed = BASE_SPEED;

  word = randomWord();
  index = 0;

  incorrectCount = 0;

  constructor(client: GameClient) {
    this.client = client;

    setTimeout(this.startRace, COUNTDOWN_DURATION);
  }

  /**
   * Updates the game state based on a new key input.
   * - if the character is correct, then we advance to the next one
   * - if the new character correctly completes the word, then the player gets a temporary speed boost, and a new word is generated
   * - if the character is a backspace, then we undo the previous incorrect character
   * - if the character is incorrect, then the player gets a temporary speed penalty
   * @param key the key that has been inputted
   * @returns
   */
  handleKeyInput = (key: string) => {
    if (!this.started) {
      return;
    }

    const correct = this.isCharacterCorrect(key);

    if (correct) {
      this.handleCorrectCharacter();
    } else if (key === "Backspace") {
      this.handleBackspace();
    } else {
      this.handleIncorrectCharacter();
    }
  };

  update = () => {
    this.progress += this.speed;

    if (this.speed > BASE_SPEED) {
      this.speed -= SPEED_RECOVERY_RATE;
    } else if (this.speed < BASE_SPEED) {
      this.speed += SPEED_RECOVERY_RATE;
    }
  };

  private startRace = () => {
    this.started = true;

    this.client.onNewWord(this.word);
  };

  private handleCorrectCharacter() {
    this.index++;

    if (this.index === this.word.length) {
      this.handleCompletedWord();
    }
  }

  private handleIncorrectCharacter() {
    this.incorrectCount += 1;

    this.speed -= SPEED_PENALTY_AMOUNT;
  }

  private handleBackspace() {
    if (this.incorrectCount > 0) {
      this.incorrectCount--;
    }
  }

  private isCharacterCorrect = (key: string): boolean => {
    return key === this.word[this.index] && this.incorrectCount === 0;
  };

  private handleCompletedWord = () => {
    this.speed += SPEED_BOOST_AMOUNT;

    this.word = randomWord();
    this.index = 0;

    this.client.onNewWord(this.word);
  };
}
