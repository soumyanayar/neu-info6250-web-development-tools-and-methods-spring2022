import compareWords from "./compareWords";
import React, { useState } from "react";

const Messages = ({ previousWord }) => {
  const [message, setMessage] = useState("");
  const secretWord = "RECAT";

  const displayResult = () => {
    const result = compareWords(secretWord, previousWord);
    if (result.length === 0) {
      setMessage(`${previousWord} is not a valid word! Try Again`);
    } else if (result.length > 0 && result.length < secretWord.length) {
      setMessage(
        `${previousWord} matched ${result.length} letters with Secret Word`
      );
    } else if (result.length === secretWord.length) {
      setMessage(`${previousWord} is a valid word!`);
    } else {
      setMessage(`${previousWord} is a not valid word!`);
    }
  };

  return (
    <div>
      <p>{message}</p>
    </div>
  );
};

export default Messages;
