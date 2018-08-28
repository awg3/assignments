import React from "react";
import "./index.css";

const ActionButton = (props) => {
    const { classes, disabled, handleClick, value } = props;

    return (
        <button
            className={classes}
            disabled={disabled}
            onClick={e => handleClick()}
        >
            { value }
        </button>
    );
}

export default ActionButton;
