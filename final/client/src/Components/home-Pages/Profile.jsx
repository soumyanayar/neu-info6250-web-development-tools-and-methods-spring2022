import { useState, useEffect } from "react";
import { fetchUpdateUser, fetchDeleteUser } from "../../services/userservices";
import { fetchDeleteAllHabits } from "../../services/habitservices";

const Profile = ({ user, setUser, setIsLoggedIn }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleResetData = async () => {
    try {
      await fetchDeleteAllHabits();
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await fetchDeleteUser();
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdateUser = async () => {
    try {
      await fetchUpdateUser(firstName, lastName, password);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
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
        <button type="submit" onClick={handleUpdateUser} className="btn-update">
          SAVE DATA
        </button>
      </form>
      <div>
        <button onClick={handleResetData}>Reset All the habits</button>
        <button onClick={handleDeleteUser}>Delete User</button>
      </div>
    </div>
  );
};

export default Profile;
