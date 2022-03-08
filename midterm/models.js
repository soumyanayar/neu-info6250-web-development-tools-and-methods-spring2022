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
    this.message = "Try to guess the secret word!";
  }

  guessWord(guessedWord) {
    this.addGuessedWord(guessedWord);

    if (isGuessedWordValid(guessedWord)) {
      ++this.numberOfValidGuesses;
    } else {
      this.message =
        "Invalid word! " +
        guessedWord +
        " is not in the acceptable word list. Try Again!";
      return;
    }

    this.isGameWon = isGuessedWordSameAsSecret(this.secretWord, guessedWord);
    if (this.isGameWon) {
      this.message = "Congratulations! You won! Hit RESTART to play again!";
    } else {
      this.message = "Try to guess the secret word!";
    }
  }

  addGuessedWord(guessedWord) {
    const numberOfMatchingLetters = calculateMatchingLetters(
      this.secretWord,
      guessedWord
    );
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
