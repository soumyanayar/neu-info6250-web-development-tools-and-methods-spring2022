import "./modalStyle.css";
import { fetchDeleteSingleHabit } from "../../services/habitservices";

const ClearModal = ({ habitKey, setDeleteHabitModalOpen }) => {
  const HandleDeleteSingleHabit = async () => {
    try {
      await fetchDeleteSingleHabit(habitKey.key);
      setDeleteHabitModalOpen(false);
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
              setDeleteHabitModalOpen(false);
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
              setDeleteHabitModalOpen(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button onClick={HandleDeleteSingleHabit}>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default ClearModal;
