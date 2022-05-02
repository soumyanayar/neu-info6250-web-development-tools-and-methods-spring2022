import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="about-container">
      <p>
        <Link to="/">HABITIZER</Link> is a simlpe habit tracking application, it
        helps you build a new good habit or break a bad habit and many more
        options
      </p>
      <p>
        We have 3 different types of habits.
        <p>
          1. Creating a Good Habit
          <br></br>
          2. Quitting a Bad Habit
          <br></br>
          3. Limiting a Bad Habit
        </p>
        <br />
        User can create a habit by clicking on the{" "}
        <Link to="/add-habit">Add Habit</Link> button.
        <br></br>
        Also adding log to the habits is possible. User can see the details of
        the habit by clicking the View habit details accordian.
        <br></br>
        We have a pie chart to show the progress of the habit. Also you can see
        in the calender which all days your data is added.
        <br />
        Apart from that user can see his profile and can update his profile.
        <br />
        At any point of time, user can <Link to="/profile">Reset</Link> all his
        data.
      </p>
    </div>
  );
};

export default About;
