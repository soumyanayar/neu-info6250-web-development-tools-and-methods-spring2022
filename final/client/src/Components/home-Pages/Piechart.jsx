import { useState } from "react";

const Piechart = ({ data }) => {
  const mystyle = {
    margin: "20px auto",
    padding: "6rem",
    maxWidth: "200px",
    height: "200px",
    borderRadius: "50%",
    // boxShadow:
    //   "0 3px 1px 2px rgba(0, 0, 0, 0.2),0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
    backgroundImage:
      "conic-gradient(limegreen " +
      data.degree1 +
      "deg, limegreen " +
      data.degree2 +
      "deg, coral " +
      data.degree2 +
      "deg, coral " +
      data.degree3 +
      "deg, lightblue " +
      data.degree3 +
      "deg, lightblue " +
      data.degree4 +
      "deg, pink " +
      data.degree4 +
      "deg, pink " +
      data.degree5 +
      "deg)",
  };

  return (
    <div className="pie-chart-container">
      <div style={mystyle}></div>
      <div>
        <p>Legend</p>
        <div className="limegreen-div">
          <button></button> <span>Successful</span>
        </div>
        <div className="coral-div">
          <button></button> <span>Failed</span>
        </div>
        <div className="light-blue-div">
          <button></button> <span>Partial</span>
        </div>
        <div className="pink-div">
          <button></button> <span>No Logs</span>
        </div>
      </div>
    </div>
  );
};

export default Piechart;
