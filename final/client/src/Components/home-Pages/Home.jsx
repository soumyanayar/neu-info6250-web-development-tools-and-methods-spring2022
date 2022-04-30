import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchGetAllHabits } from "../../services/habitservices";
import ViewHabitDetailsAccordian from "./ViewHabitDetailsAccordian";
import AddHabitLogAccordian from "./AddHabitLogAccordian";

const Home = () => {
    const [allHabits, setAllHabits] = useState({});
    const [habit, setHabit] = useState({});
    const [error, setError] = useState("");

    const getAllHabits = async () => {
        try {
            const fetchedHabitIds = await fetchGetAllHabits();
            setAllHabits(fetchedHabitIds);
            setError("");
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        getAllHabits();
    }, []);

    if (allHabits.length === 0) {
        return (
            <div>
                <h1>Welcome to Habit Tracker</h1>
                <p>
                    To get started, create a new habit by clicking{" "}
                    <Link>Add habit</Link>
                </p>
            </div>
        );
    }
    return (
        <div>
            <h3> You have below habits so far !!</h3>
            <div>
                <ul>
                    {Object.entries(allHabits).map(([key, value]) => {
                        return (
                            <li key={key}>
                                <span>
                                    <b>{value.habitName}</b>
                                </span>
                                <ViewHabitDetailsAccordian
                                    habitId={value.habitId}
                                    habitType={value.habitType}
                                />
                                <AddHabitLogAccordian
                                    habitId={value.habitId}
                                    habitType={value.habitType}
                                />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Home;
