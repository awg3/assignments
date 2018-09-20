import React, { Component } from "react";
import "./index.css";

export default class Employees extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: {
                age: null,
                name: "",
            },
            group: "",
            list: [],
        };
    }

    componentWillMount() {
        const { group, list } = this.props;

        this.setState({ list, group });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.setState(nextProps);
        }
    }

    handleChange = (event) =>
        this.setState({
            filter: {
                ...this.state.filter,
                [event.target.name]: event.target.value,
            }
        });

    filterByGroup = () => {
        const { group, list } = this.state;
        const mock = list;

        return mock.filter(elem => {
            const { age, gender, location, position } = elem;
            const mockGroup = group.toLowerCase();
            const radix = 10;

            if (mockGroup.indexOf("-") >= 0) {
                // Filter by age based on range.
                const min = parseInt(mockGroup.split("-")[0], radix);
                const max = parseInt(mockGroup.split("-")[1], radix);

                if (parseInt(age, radix) >= min && parseInt(age, radix) <= max) {
                    return true;
                }
            } else if (
                mockGroup === location.toLowerCase() ||
                mockGroup === gender.toLowerCase() ||
                mockGroup === position.toLowerCase()) {
                return true;
            }

            return false;
        });
    }

    filterByOther = (list) => {
        const { age, name } = this.state.filter;

        if (age) {
            return list.filter(elem => elem.age === age);
        } else if (name) {
            return list.filter(elem => {
                const elemName = `${elem.f_name} ${elem.l_name}`.toLowerCase();
                return elemName.includes(name.toLowerCase());
            });
        }

        return list;
    }

    render() {
        const { editUser } = this.props;
        const filteredList = this.filterByOther(this.filterByGroup());

        return (
            <div className="Employees">
                { filteredList.length > 0 ?
                    <div>
                        <div className="filterBy">
                            <div className="title">Filter By</div>
                            <input className="filterBy_name" type="text" name="name" placeholder="name" onChange={this.handleChange} />
                            <div className="title">OR</div>
                            <input className="filterBy_age" type="number" name="age" placeholder="age" onChange={this.handleChange} />
                        </div>
                        <div className="table">
                            { filteredList.map(elem => {
                                const { age, description, id, image, f_name, l_name, position } = elem;

                                return (
                                    <div
                                        key={id}
                                        className="Card"
                                        onClick={e => editUser(elem)}
                                    >
                                        <img src={image} alt="profile" />
                                        <div className="name">{`${f_name} ${l_name}`}</div>
                                        <div>{ position }</div>
                                        <div>Age: { age }</div>
                                        <div className="description">{ description }</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    :
                    <div className="noResults">
                        No results found for this demografic group
                    </div>
                }
            </div>
        );
    }
}
