// Read words from words.js

const words = require("./words.js");

// function to return a random word
const getRandomSecretWord = () => {
  return words[Math.floor(Math.random() * words.length)];
};

// function to check if a word is a valid word from the list case-insensitive
const isGuessedWordValid = (guessedWord) => {
  return words.includes(guessedWord.toLowerCase());
};

const isGuessedWordSameAsSecret = (secretWord, guessedWord) => {
  return secretWord.toLowerCase() === guessedWord.toLowerCase();
};

const calculateMatchingLetters = (secretWord, guessedWord) => {
  let count = 0;
  let secretWordInLowerCase = secretWord.toLowerCase();
  let guessedWordInLowerCase = guessedWord.toLowerCase();
  for (let index in secretWordInLowerCase) {
    let currentLetter = secretWordInLowerCase[index];
    if (guessedWordInLowerCase.includes(currentLetter)) {
      ++count;
      guessedWordInLowerCase = guessedWordInLowerCase.replace(
        currentLetter,
        ""
      );
    }
  }
  return count;
};

module.exports = {
  getRandomSecretWord,
  isGuessedWordValid,
  calculateMatchingLetters,
  isGuessedWordSameAsSecret,
};
