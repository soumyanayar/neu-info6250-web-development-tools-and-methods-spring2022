import { useState } from "react";
import { fetchUpdateUser, fetchDeleteUser } from "../../services/userservices";
import ClearModal from "../modals/ClearModal";

const Profile = ({ user, setUser, setIsLoggedIn }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleUpdateUser = async () => {
    try {
      await fetchUpdateUser(firstName, lastName, password);
      setUser({ firstName, lastName, password });
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="profile-div">
      <div className="profile-container">
        <form>
          <label>First Name:</label>
          <input
            type="text"
            value={user.firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label>Last Name:</label>
          <input
            type="text"
            value={user.lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            onClick={handleUpdateUser}
            className="btn-update"
          >
            SAVE DATA
          </button>
        </form>
      </div>
      <div className="caution-div">
        <span>
          Do you want to Clear all the habits ?{" "}
          <button
            className="openModalBtn"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Open
          </button>
          {modalOpen && <ClearModal setOpenModal={setModalOpen} />}
        </span>
        <span>
          Delete Account ? <button>Delete Account</button>
        </span>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Profile;
