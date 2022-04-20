import React from "react";
import { useState, useEffect } from "react";
import {
  fetchGetAllHabits,
  fetchGetSingleHabit,
} from "../../services/habitservices";

const Home = () => {
  const [allHabitsId, setAllHabitsId] = useState({});
  const [habit, setHabit] = useState({});
  const [error, setError] = useState("");

  const getAllHabits = async () => {
    try {
      const fetchedHabitIds = await fetchGetAllHabits();
      setAllHabitsId(fetchedHabitIds);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const getSingleHabit = async (id) => {
    try {
      const fetchedHabit = await fetchGetSingleHabit(id);
      setError("");
      setHabit(fetchedHabit);
      return fetchedHabit;
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getAllHabits();
  }, []);
  return (
    <div>
      <h3> You have below habits so far !!</h3>
    </div>
  );
};

export default Home;
