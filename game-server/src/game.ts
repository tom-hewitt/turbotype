import { randomWord } from "./wordGeneration";

export interface GameClient {
  onNewWord: (word: string) => void;
}

const COUNTDOWN_DURATION = 3;

const BASE_SPEED = 10;

const BOOST_AMOUNT = 20;

const PENALTY_AMOUNT = 5;

/**
 * has to be a factor of BOOST_AMOUNT
 */
const SPEED_RECOVERY_RATE = 1;

export class GameServer {
  client: GameClient;

  started = false;

  progress = 0;
  speed = BASE_SPEED;

  word = randomWord();
  index = 0;

  lastCharacterIncorrect = false;

  constructor(client: GameClient) {
    this.client = client;

    setTimeout(this.startRace, COUNTDOWN_DURATION);
  }

  startRace = () => {
    this.started = true;

    this.client.onNewWord(this.word);
  };

  keyInput = (key: string) => {
    console.log(key, this.word, this.index);

    // ignore key input if the race hasn't started yet
    if (!this.started) {
      return;
    }

    // if the user input a wrong character last time, they need to backspace it
    if (this.lastCharacterIncorrect) {
      if (key === "Backspace") {
        this.lastCharacterIncorrect = false;
      }
    }

    if (this.checkInput(key)) {
      this.index++;

      if (this.index === this.word.length) {
        this.gotWordRight();
      }
    } else {
      this.lastCharacterIncorrect = true;

      this.speed -= PENALTY_AMOUNT;
    }
  };

  /**
   * checks the key pressed and the value at word[index]
   * index will be increased from where the function is called
   * new word will be generated from where the function is called
   * called at each key press event
   */
  checkInput = (key: string): boolean => {
    return key === this.word[this.index];
  };

  gotWordRight = () => {
    this.speed += BOOST_AMOUNT;

    this.word = randomWord();
    this.index = 0;

    this.client.onNewWord(this.word);
  };

  update = () => {
    this.progress += this.speed;

    if (this.speed > BASE_SPEED) {
      this.speed -= SPEED_RECOVERY_RATE;
    } else if (this.speed < BASE_SPEED) {
      this.speed += SPEED_RECOVERY_RATE;
    }
  };
}

export class Player {}
