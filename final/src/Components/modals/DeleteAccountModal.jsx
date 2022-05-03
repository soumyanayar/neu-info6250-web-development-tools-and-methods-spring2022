import "./modalStyle.css";
import { fetchDeleteUser } from "../../services/userservices";
import { useState } from "react";

const DeleteAccountModal = ({ setOpenModal, setIsLoggedIn, setUser }) => {
  const [error, setError] = useState("");

  const handleDeleteUser = async () => {
    try {
      await fetchDeleteUser();
      setError("");
      setIsLoggedIn(false);
      setUser({});
      setOpenModal(false);
      return (window.location.href = "/");
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
          <p>Your account will be deleted and all the data wil be lost</p>
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
          <button onClick={handleDeleteUser}>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
