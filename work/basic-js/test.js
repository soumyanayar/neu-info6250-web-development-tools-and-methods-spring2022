/* DO NOT MODIFY THIS FILE - USED FOR TESTING */
const compare = require('./compare');

const words = process.argv.slice(2);

console.log(`comparing -${words[0]}- and -${words[1]}-`);
const matches = compare(...words);
console.log(`It thinks there are ${matches} letters in common, regardless of position, regardless of upper/lowercase`);
/* DO NOT MODIFY THIS FILE - USED FOR TESTING */
