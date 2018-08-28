import React, { Component } from "react";
import "./index.css";

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showRules: false,
        };

        this.toggleRules = this.toggleRules.bind(this);
    }

    toggleRules = () => {
        const { showRules } = this.state;

        this.setState({
            showRules: !showRules,
        });
    }

    render() {
        const { flippedNums, gameName, gameOver, totalNums } = this.props;
        const { showRules } = this.state;

        return (
            <header className="Header">
                <h1>{gameName}</h1>
                <button
                    className="rulesButton"
                    onClick={e => this.toggleRules()}
                >
                    { showRules ? "Hide" : "Show" } the rules
                </button>
                { showRules &&
                    <div className="rules">
                        <p>{
                            `There are two dices, begin by rolling them.
                            Once you have rolled, you may begin by flipping numbers in the box.`}
                        </p>
                        <p>{`The numbers that can be flipped are either: the total sum of the dice, or any combination
                            of two numbers whose sum is the total of both dice.`}
                        </p>
                        <p>
                            {`To shut the box: you need to flip all the numbers in the box.`}
                        </p>
                        <p>
                            {`To win against other players: earn the highest score.`}
                        </p>
                    </div>
                }
                { flippedNums.length > 0 &&
                    <div className="total">
                        { flippedNums.length === totalNums
                            ? "Shut the box! "
                            : gameOver ? "Final Score: " : "Score: "
                        }
                        { flippedNums.reduce((a, b) => a + b, 0) }
                    </div>
                }
            </header>
        );
    }
};

export default Header;
