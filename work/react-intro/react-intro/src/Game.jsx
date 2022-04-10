import { useState } from "react";
import compareWords from "./compareWords";

const Game = () => {
  const [userWord, setUserWord] = useState("");
  const [previousWord, setPreviousWord] = useState("");
  const [message, setMessage] = useState("");
  const secretWord = "RECAT";

  const handleClick = (e) => {
    e.preventDefault();
    setPreviousWord(userWord);
    displayResult(userWord);
    setUserWord("");
  };

  const displayResult = (word) => {
    const result = compareWords(secretWord, word);

    if (result === 0) {
      setMessage(`You entered a invalid word! Try Again`);
    } else if (result > 0 && result < secretWord.length) {
      setMessage(`${word} matched ${result} letters with Secret Word`);
    } else if (result === secretWord.length) {
      setMessage(`${word} is a valid word!`);
    }
  };

  return (
    <div>
      <h2>Welcome to the Word Guessing Game!</h2>
      <div className="container">
        <label>Enter a word:</label>
        <form>
          <input
            placeholder="Enter the word here"
            type="text"
            value={userWord}
            onChange={(e) => setUserWord(e.target.value)}
          />
          <button onClick={handleClick}>Click To Guess</button>
        </form>
      </div>
      <p>
        Previous Word: <span className="prev-msg">{previousWord}</span>
      </p>
      <p className="result-msg">{message}</p>
    </div>
  );
};

export default Game;
