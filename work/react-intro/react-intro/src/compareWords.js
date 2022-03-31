const compareWords = (secretWord, guessedWord) => {
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

module.exports = compareWords;
