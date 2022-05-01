import "./modalStyle.css";
import { fetchDeleteAllHabits } from "../../services/habitservices";

const ClearModal = ({ setOpenModal }) => {
  const handleClearHabits = async () => {
    try {
      await fetchDeleteAllHabits();
      setOpenModal(false);
    } catch (error) {
      console.log(error);
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
