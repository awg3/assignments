import React, { Component } from "react";
import "./index.css";

export default class SelectBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: "",
        };
    }

    componentWillMount() {
        this.setState({ selected: "" });
    }

    selectElem = (elem) => {
        this.props.select(elem);

        this.setState({
            selected: elem,
        });
    }

    render() {
        const { addDemografic, array, deleteDemografic, editDemografic, isDemografic, isSelected, title } = this.props;
        const { selected } = this.state;

        return (
            <div className="SelectBar">
                { title && <div className="title">{ title }</div> }
                { isDemografic &&
                    <div className="crud">
                        <div className="crud__add" onClick={e => addDemografic()}>Add</div>
                        { isSelected &&
                            <div className="crud__edit" onClick={e => editDemografic()}>Edit</div>
                        }
                        { isSelected &&
                            <div className="crud__delete" onClick={e => deleteDemografic()}>Delete</div>
                        }
                    </div>
                }
                <div className="navigation">
                { array && array.map(elem => (
                    <div
                        key={elem}
                        className={selected === elem ? "element selected" : "element"}
                        onClick={e => selected !== elem ? this.selectElem(elem) : null}>
                        { elem }
                    </div>
                ))}
                </div>
            </div>
        );
    }
}
