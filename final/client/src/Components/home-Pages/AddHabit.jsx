import { useState } from "react";
import CreateGoodHabit from "./CreateGoodHabit";
import QuitBadHabit from "./QuitBadHabit";
import LimitBadHabit from "./LimitBadHabit";

const AddHabit = () => {
  const [toggleTabs, setToggleTabs] = useState(1);

  const toggleTab = (tabNumber) => {
    setToggleTabs(tabNumber);
  };

  return (
    <div className="main-div">
      <h3 className="section-title">ADD A HABIT</h3>
      <div className="tool-tabs-container">
        <div className="tool-tabs-div">
          <button
            className={
              toggleTabs === 1 ? "tools-tabs current-tools-tab" : "tools-tabs"
            }
            onClick={() => toggleTab(1)}
          >
            CREATE A GOOD HABIT
          </button>
          <button
            className={
              toggleTabs === 2 ? "tools-tabs current-tools-tab" : "tools-tabs"
            }
            onClick={() => toggleTab(2)}
          >
            QUIT A BAD HABIT
          </button>
          <button
            className={
              toggleTabs === 3 ? "tools-tabs current-tools-tab" : "tools-tabs"
            }
            onClick={() => toggleTab(3)}
          >
            LIMIT A BAD HABIT
          </button>
        </div>
      </div>
      <div className="content-tabs-div">
        <div
          className={
            toggleTabs === 1
              ? "tools-content  current-tools-content"
              : "tools-content"
          }
        >
          <CreateGoodHabit />
        </div>

        <div
          className={
            toggleTabs === 2
              ? "tools-content  current-tools-content"
              : "tools-content"
          }
        >
          <QuitBadHabit />
        </div>

        <div
          className={
            toggleTabs === 3
              ? "tools-content  current-tools-content"
              : "tools-content"
          }
        >
          <LimitBadHabit />
        </div>
      </div>
    </div>
  );
};

export default AddHabit;
