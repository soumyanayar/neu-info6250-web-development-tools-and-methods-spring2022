/* DO NOT MODIFY THIS FILE - USED FOR TESTING */
const readline = require('readline').createInterface({ input: process.stdin, output: process.stdout });
const compare = require('./compare');

const wordList = `
START TREES TREAT STARS TRAPS PARTS
STRAP STARK CARTS SPREE TARPS TARTS
CRASH TRASH SHARP HARPS CRUSH RUSTS
RESTS STEER STARE TRACK THESE TRUCK
`.split(/\s+/).filter( exists => !!exists );
/* DO NOT MODIFY THIS FILE - USED FOR TESTING */


const game = {
  word: process.env.OVERRIDE || pickWord(wordList),
  turns: 0
};

if(process.env.DEBUG) { console.log(`PSST!  The word is ${game.word}`); }

console.log(`The word is ${game.word.length} letters`);
prompt();

function prompt() {
  readline.question('your guess? ', guess => takeTurn(game, guess) );
}
/* DO NOT MODIFY THIS FILE - USED FOR TESTING */

function takeTurn(game, guess) {
  if(!guess) {
    prompt();
  }

  game.turns++;
  if(exactMatch(game.word, guess)) {
    console.log(`CORRECT!  You won in ${game.turns} turns!`);
    readline.close();
    return;
  }
  const match = compare(game.word, guess);
  console.log(`You matched ${match} letters out of ${game.word.length}`);
  prompt();
}

function exactMatch(word, guess) {
  return word.toUpperCase() === guess.toUpperCase(); // Case-insensitive compare
}

function pickWord(wordList) {
  return wordList[Math.floor(Math.random() * wordList.length)];
}
/* DO NOT MODIFY THIS FILE - USED FOR TESTING */

