import React, { Component } from "react";
import "./index.css";

export default class Modal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            age: "",
            demografic: "",
            description: "",
            id: "",
            name: "",
            position: "",
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        const { data, type } = this.props;
        const { demografic } = this.state;

        if (type === "add demografic") {
            this.setState({
                demografic,
            });
        } else if (type === "edit demografic") {
            this.setState({
                demografic: data.demografic,
            });
        } else if (type === "employee") {
            this.setState({
                age: data.age,
                demografic: data.demografic,
                description: data.description,
                id: data.id,
                name: data.name,
                position: data.position,
            });
        }
    }

    handleChange = (event) =>
        this.setState({
            [event.target.name]: event.target.value,
        });

    editUserData = (e) => {
        e.preventDefault();

        const { closeModal, data } = this.props;
        const { age, description, id, name, position } = this.state;
        let canSubmit = false;

        if (data.age !== age || data.description !== description ||
            data.name !== name || data.position !== position) {
            // Form can be submitted.
            canSubmit = true;
        }

        if (canSubmit) {
            let changes = {};

            changes.id = id;
            
            if (data.age !== age) {
                changes.age = age;
            }
            
            if (data.description !== description) {
                changes.description = description;
            }
            
            if (data.name !== name) {
                changes.f_name = name.split(" ")[0];
                changes.l_name = name.split(" ")[1];
            }
    
            if (data.position !== position) {
                changes.position = position;
            }
    
            if (Object.keys(changes).length > 0) {
                this.props.editUser(changes);
            }

            closeModal();
        }
    }

    renderAddDemografic = () => {
        const { addDemografic } = this.props;

        return (
            <div>
                <div className="title">Add Demografic</div>
                <form onSubmit={e => addDemografic(e)}>
                    <div className="inputField">
                        <label htmlFor="description">Demografic</label>
                        <input onChange={this.handleChange} type="text" name="demografic" placeholder="New Demografic" />
                    </div>
                    <div className="inputField">
                        <label htmlFor="description">Groups</label>
                        <input onChange={this.handleChange} type="text" name="groups" placeholder="New Groups" />
                    </div>
                    <button
                        className="submit"
                        type="submit"
                    >
                        Add
                    </button>
                </form>
            </div>
        );
    }

    renderEditDemografic = () => {
        const { editDemografic } = this.props;
        const { demografic } = this.state;

        return (
            <div>
                <div className="title">Edit Demografic</div>
                <form onSubmit={e => editDemografic(e)}>
                    <div className="inputField">
                        <label htmlFor="description">Demografic</label>
                        <input onChange={this.handleChange} type="text" name="demografic" value={demografic} />
                    </div>
                    <button
                        className="submit"
                        type="submit"
                    >
                        Edit
                    </button>
                </form>
            </div>
        );
    }

    renderEditEmployee = () => {
        const { age, description, name, position } = this.state;

        return (
            <div>
                <div className="title">Edit User</div>
                <form onSubmit={e => this.editUserData(e)}>
                    <div className="inputField">
                        <label htmlFor="description">Name</label>
                        <input onChange={this.handleChange} type="text" name="name" value={name} />
                    </div>
                    <div className="inputField">
                        <label htmlFor="age">Age</label>
                        <input onChange={this.handleChange} type="text" name="age" value={age} />
                    </div>
                    <div className="inputField">
                        <label htmlFor="position">Position</label>
                        <input onChange={this.handleChange} type="text" name="position" value={position} />
                    </div>
                    <div className="inputField">
                        <label htmlFor="description">Description</label>
                        <input onChange={this.handleChange} type="text" name="description" value={description} />
                    </div>
                    <button
                        className="submit"
                        type="submit"
                    >
                        Save
                    </button>
                </form>
            </div>
        );
    }

    render() {
        const { closeModal, type } = this.props;

        return (
            <div className="Modal">
                <div className="overlay"></div>
                <div className="content">
                    <div
                        className="close"
                        onClick={e => closeModal()}
                    >
                        close
                    </div>
                    { type === "employee" && this.renderEditEmployee() }
                    { type === "add demografic" && this.renderAddDemografic() }
                    { type === "edit demografic" && this.renderEditDemografic() }
                </div>
            </div>
        );
    }
}
