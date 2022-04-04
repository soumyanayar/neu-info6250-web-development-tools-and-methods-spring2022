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
    if (this.checkIfTheWordAlreadyGuessed(guessedWord)) {
      this.message = `You have already guessed "${guessedWord}"! Try a new word from the list!`;
      return;
    }

    if (isGuessedWordValid(guessedWord)) {
      ++this.numberOfValidGuesses;
      this.addGuessedWord(guessedWord);
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
    // Add to the beginning of the array
    this.guessedWords.unshift(new Guess(guessedWord, numberOfMatchingLetters));
  }

  // Check if the word is already guessed
  checkIfTheWordAlreadyGuessed(guessedWord) {
    return this.guessedWords.some((word) => {
      return word.guessedWord === guessedWord;
    });
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
    console.log(
      `Secret word for user "${this.username}" is "${this.game.secretWord}"`
    );
  }

  createNewGame() {
    this.game = new Game(getRandomSecretWord());
  }
}

module.exports = { Game, Guess, User };
