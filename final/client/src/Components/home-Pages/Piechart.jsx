import { useState } from "react";

const Piechart = ({ data }) => {
    const mystyle = {
        margin: "20px auto",
        padding: "25px",
        maxWidth: "200px",
        height: "200px",
        borderRadius: "50%",
        boxShadow:
            "0 3px 1px 2px rgba(0, 0, 0, 0.2),0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
        backgroundImage:
            "conic-gradient(magenta " +
            data.degree1 +
            "deg, magenta " +
            data.degree2 +
            "deg, cyan " +
            data.degree2 +
            "deg, cyan " +
            data.degree3 +
            "deg, yellow " +
            data.degree3 +
            "deg, yellow " +
            data.degree4 +
            "deg, green " +
            data.degree4 +
            "deg, green " +
            data.degree5 +
            "deg)",
    };

    return (
        <div>
            <div style={mystyle}></div>
        </div>
    );
};

export default Piechart;
