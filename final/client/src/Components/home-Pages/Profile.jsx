import { useState } from "react";
import { fetchUpdateUser, fetchDeleteUser } from "../../services/userservices";
import { fetchDeleteAllHabits } from "../../services/habitservices";
import DeleteWarningModal from "./DeleteWarningModal";

const Profile = ({ user, setUser, setIsLoggedIn }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleResetData = async () => {
    <DeleteWarningModal />;
  };

  const handleDeleteUser = async () => {
    <DeleteWarningModal />;
  };

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
          Do you want to Reset All the data ? <button>Reset</button>
        </span>
        <span>
          Delete Account ? <button>Delete User</button>
        </span>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Profile;
