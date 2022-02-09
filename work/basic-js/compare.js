"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare(word, guess) {
  let count = 0;
  let wordInLowerCase = word.toLowerCase();
  let guessInLowerCase = guess.toLowerCase();
  for (let index in wordInLowerCase) {
    let currentLetter = wordInLowerCase[index];
    if (guessInLowerCase.includes(currentLetter)) {
      ++count;
      guessInLowerCase = guessInLowerCase.replace(currentLetter, "");
    }
  }
  return count;
}
