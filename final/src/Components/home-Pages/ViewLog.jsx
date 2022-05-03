import { useEffect, useState } from "react";
import { fetchGetSingleHabit } from "../../services/habitservices";

const ViewLog = ({ id }) => {
  const [habit, setHabit] = useState({});
  const [error, setError] = useState("");

  const getSingleHabit = async () => {
    try {
      const fetchedHabit = await fetchGetSingleHabit(id);
      setHabit(fetchedHabit);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getSingleHabit();
  }, []);

  return (
    <div>
      {Object.entries(habit).map(([key, value]) => {
        return (
          <div key={key}>
            <h3>{value.habitName}</h3>
            <p>{value.goal}</p>
            <p>{value.unit}</p>
            <p>{value.duration}</p>
            <p>{value.startDate}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ViewLog;
