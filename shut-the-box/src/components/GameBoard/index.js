import React, { Component } from "react";
import FlipNumber from "../FlipNumber";
import "./index.css";

class GameBoard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9]
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = selectedNumber => {
        const {
            dice1,
            dice2,
            flip,
            selectedNums,
            setSelectedNums,
            status,
        } = this.props;

        const diceSum = dice1 + dice2;
        const countSelected = selectedNums.length;
        let tempNums = selectedNums;

        if (!status.gameOver) {
            if (countSelected === 0) {
                if (dice1 === dice2) {
                    if (selectedNumber === diceSum) {
                        flip(selectedNumber);
                    } else if (selectedNumber < diceSum) {
                        tempNums.push(selectedNumber);
                        setSelectedNums(tempNums);
                    }
                } else if (dice1 !== dice2) {
                    if (selectedNumber === diceSum) {
                        flip(selectedNumber);
                    } else if (selectedNumber < diceSum) {
                        tempNums.push(selectedNumber);
                        setSelectedNums(tempNums);
                    }
                }
            } else if (countSelected === 1) {
                if (dice1 === dice2 && tempNums[0] === diceSum) {
                    flip(tempNums);
                }
                if (
                    tempNums[0] !== selectedNumber &&
                    tempNums[0] + selectedNumber === diceSum
                ) {
                    tempNums.push(selectedNumber);
                    flip(tempNums);
                } else {
                    tempNums[0] = selectedNumber;
                    setSelectedNums(tempNums);
                }
            }
        }
    };

    render() {
        const { flippedNums, numbers, status } = this.props;
        const { gameOver, start, canRollDice } = status;
        const isEnabled = !gameOver && start && !canRollDice;

        return (
            <div className="GameBoard">
                { numbers.map(num => (
                    <FlipNumber
                        key={`num-${num.toString()}`}
                        classes={
                            flippedNums.find(elem => elem === num)
                                ? "number flipped"
                                : isEnabled ? "number" : "number disabled"
                        }
                        disabled={!isEnabled}
                        handleClick={e => {
                            if (isEnabled) {
                                this.handleClick(num);
                            }
                        }}
                        value={num}
                    />
                ))}
            </div>
        );
    }
}

export default GameBoard;
