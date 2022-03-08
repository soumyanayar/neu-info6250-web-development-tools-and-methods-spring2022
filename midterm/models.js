const {
  getRandomSecretWord,
  isGuessedWordValid,
  calculateMatchingLetters,
  isGuessedWordSameAsSecret,
} = require("./game-helpers");

class Game {
  constructor(secretWord) {
    this.secretWord = secretWord;
    this.numberOfValidGuesses = 0;
    this.guessedWords = [];
    this.isGameWon = false;
  }

  guessWord(guessedWord) {
    if (isGuessedWordValid(guessedWord)) {
      ++this.numberOfValidGuesses;
    }

    this.isGameWon = isGuessedWordSameAsSecret(this.secretWord, guessedWord);
    this.addGuessedWord(guessedWord);
  }

  addGuessedWord(guessedWord) {
    const numberOfMatchingLetters = calculateMatchingLetters(guessedWord);
    this.guessedWords.push(new Guess(guessedWord, numberOfMatchingLetters));
  }
}

class Guess {
  constructor(guessedWord, numberOfMatchingLetters) {
    this.guessedWord = guessedWord;
    this.numberOfMatchingLetters = numberOfMatchingLetters;
  }
}

class User {
  constructor(username) {
    this.username = username;
    this.game = new Game(getRandomSecretWord());
    console.log(this.game.secretWord);
  }

  createNewGame() {
    this.game = new Game(getRandomSecretWord());
    console.log(this.game.secretWord);
  }
}

module.exports = { Game, Guess, User };
