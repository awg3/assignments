import React, { Component } from "react";
import Dices from "./components/Dices";
import GameBoard from "./components/GameBoard";
import Header from "./components/Header";
import "./App.css";

class ShutTheBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dice1: 0,
            dice2: 0,
            flippedNums: [],
            remainingNums: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            selectedNums: [],
            status: {
                gameOver: false,
                win: false,
                lose: false,
                start: false,
                canRollDice: true,
            }
        };
    }

    flip = selection => {
        const { flippedNums, remainingNums } = this.state;
        const tempFlipped = flippedNums;
        const tempRemaining = remainingNums;

        if (selection && typeof selection === "number") {
            tempFlipped.push(selection);
            tempRemaining.splice(tempRemaining.indexOf(selection), 1);
            this.setGameStatus({ canRollDice: true });
            this.setState({
                flippedNums: tempFlipped,
                remainingNums: tempRemaining,
            });

        } else if (selection && typeof selection === "object") {
            let index = tempRemaining.indexOf(selection[0]);

            if (index >= 0) {
                tempFlipped.push(selection[0]);
                tempRemaining.splice(index, 1);
            }

            index = tempRemaining.indexOf(selection[1]);

            if (index >= 0) {
                tempFlipped.push(selection[1]);
                tempRemaining.splice(index, 1);
            }

            this.setGameStatus({ canRollDice: true });
            this.setState({
                flippedNums: tempFlipped,
                selectedNums: [],
                remainingNums: tempRemaining,
            });
        }
    };

    reset = () => {
        this.setState({
            dice1: 0,
            dice2: 0,
            flippedNums: [],
            remainingNums: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            selectedNums: [],
            status: {
                gameOver: false,
                win: false,
                lose: false,
                start: false,
                canRollDice: true,
            }
        });
    };

    setDices = (num1, num2) => {
        this.setGameStatus({ canRollDice: false });

        this.setState({
            dice1: num1,
            dice2: num2,
            selectedNums: [],
        });
    };

    setGameStatus = (obj) => {
        const { status } = this.state;

        for (let prop in obj) {
            status[prop] = obj[prop];
        }

        this.setState({
            status: status,
        });
    };

    setGameOver = () => {
        this.setGameStatus({ gameOver: true });
    };

    setSelectedNums = selectedNums => {
        this.setState({
            selectedNums: selectedNums
        });
    };

    start = (num1, num2) => {
        this.setGameStatus({
            canRollDice: true,
            start: true,
        });

        this.setDices(num1, num2);
    };

    gameName = "Shut The Box";
    numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    render() {
        const {
            dice1,
            dice2,
            flippedNums,
            remainingNums,
            selectedNums,
            status,
        } = this.state;

        return (
            <div>
                <Header
                    flippedNums={flippedNums}
                    gameName={this.gameName}
                    gameOver={status.gameOver}
                    totalNums={this.numbers.length}
                />
                <GameBoard
                    dice1={dice1}
                    dice2={dice2}
                    flip={this.flip}
                    flippedNums={flippedNums}
                    numbers={this.numbers}
                    selectedNums={selectedNums}
                    setSelectedNums={this.setSelectedNums}
                    status={status}
                />
                <Dices
                    dice1={dice1}
                    dice2={dice2}
                    flippedNums={flippedNums}
                    remainingNums={remainingNums}
                    reset={this.reset}
                    setDices={this.setDices}
                    setGameOver={this.setGameOver}
                    selectedNums={selectedNums}
                    start={this.start}
                    status={status}
                />
                { selectedNums.length > 0 && (
                    <div className="selected">
                        {selectedNums.map(num => <span key={`key-${num}`}>{`Selected: ${num}`}</span>)}
                    </div>
                )}
            </div>
        );
    }
}


class App extends Component {
    render() {
        return (
            <div className="App">
                <ShutTheBox />
            </div>
        );
    }
}

export default App;
