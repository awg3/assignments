import React from "react";
import "./index.css";

const FlipNumber = (props) => {
    const { classes, disabled, handleClick, value } = props;

    return (
        <div
            className={classes}
            disabled={disabled}
            onClick={e => handleClick()}
        >
            <span className="num">{ value }</span>
        </div>
    );
};

export default FlipNumber;
