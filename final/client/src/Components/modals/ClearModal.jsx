import "./modalStyle.css";
import { fetchDeleteAllHabits } from "../../services/habitservices";
import { useState } from "react";

const ClearModal = ({ setOpenModal }) => {
  const [error, setError] = useState("");

  const handleClearHabits = async () => {
    try {
      await fetchDeleteAllHabits();
      setError("");
      setOpenModal(false);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <p>All your habit data will be deleted</p>
          <p>Are You Sure You Want to Continue?</p>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button onClick={handleClearHabits}>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default ClearModal;
