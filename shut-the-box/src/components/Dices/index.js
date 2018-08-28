import React, { Component } from "react";
import ActionButton from "../ActionButton";
import "./index.css";

class Dices extends Component {
    constructor(props) {
        super(props);

        this.rollTheDice = this.rollTheDice.bind(this);
    }

    min = Math.ceil(1);
    max = Math.floor(7);

    getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min)) + min;

    resetGame = () => {
        const { dice1, dice2 } = this.props;

        if (dice1 && dice2) {
            const { reset } = this.props;

            reset();
        }
    };

    rollTheDice = () => {
        const {
            remainingNums,
            setDices,
            setGameOver,
            start,
            status,
        } = this.props;

        const randomNumber1 = this.getRandomNumber(this.min, this.max);
        const randomNumber2 = this.getRandomNumber(this.min, this.max);

        if (!status.start) {
            // start the game by rolling the dice.
            start(randomNumber1, randomNumber2);
        } else if (!status.gameOver) {
            if (status.canRollDice) {
                // Roll the dice with new numbers.
                setDices(randomNumber1, randomNumber2);

                const total = randomNumber1 + randomNumber2;
                const getTwoSum = this.twoSum(remainingNums, (randomNumber1 + randomNumber2));

                if (getTwoSum.length === 0 && remainingNums.indexOf(total) < 0) {
                    setGameOver();
                }
            }
        }
    };

    twoSum = (arr, target) => {
        let map = {},
            results = [];

        for (let i = 0; i < arr.length; i++) {
            if (map[arr[i]] !== undefined) {
                results.push([map[arr[i]], arr[i]]);
            } else {
                map[target - arr[i]] = arr[i];
            }
        }

        return results;
    };

    render() {
        const { dice1, dice2, status } = this.props;
        const { canRollDice, gameOver } = status;

        return (
            <div className="Dices">
                <ActionButton
                    classes={canRollDice ? "actionButton start" : "actionButton start disabled"}
                    disabled={!canRollDice}
                    handleClick={this.rollTheDice}
                    value="Roll"
                />
                <div className="container">
                    <div className="dice">{dice1 !== 0 ? dice1 : "dice"}</div>
                    <div className="dice">{dice2 !== 0 ? dice2 : "dice"}</div>
                </div>
                <ActionButton
                    classes={
                        dice1 === 0 || dice2 === 0
                            ? "actionButton reset disabled"
                            : gameOver ? "actionButton reset highlight" : "actionButton reset"
                    }
                    disabled={dice1 === 0 || dice2 === 0}
                    handleClick={this.resetGame}
                    value="Restart"
                />
            </div>
        );
    }
}

export default Dices;
