import React, { Component } from "react";
import Employees from "../Employees";
import Modal from "../Modal";
import SelectBar from "../SelectBar";
import "./index.css";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            byID: [],
            demografic: "",
            demografics: [],
            employee: {},
            employees: {},
            group: "",
            groups: [],
            modal: {
                status: false,
                type: "",
            }
        };
    }

    componentWillMount() {
        const { byID, employees } = this.props;

        this.setState({
            byID,
            demografics: byID.map(obj => Object.keys(obj)[0]),
            employees,
        });
    }

    addDemografic = (event) => {
        event.preventDefault();

        const { byID, employees } = this.props;
        const { demografics } = this.state;
        const mockByID = byID;
        const mockDemografics = demografics;
        const newGroups = event.target.groups.value.toLowerCase().split(", ");
        const possibleDemografics = Object.keys(employees[0]);
        let newDemografic = event.target.demografic.value.toLowerCase();

        if (!possibleDemografics.includes(newDemografic)) {
            newDemografic = this.firstLetterUppercase(newDemografic);
            newGroups.map(group => this.firstLetterUppercase(group));
            mockByID.push({ [newDemografic]: newGroups });
            mockDemografics.push(newDemografic);

            this.setState({
                byID: mockByID,
                demografics: mockDemografics,
            });

            this.closeModal();
        }
    }

    closeModal = () => {
        this.setState({
            modal: {
                status: false,
                type: "",
            },
            employee: {},
        });
    }

    deleteDemografic = () => {
        const { byID } = this.props;
        const { demografic, demografics } = this.state;
        const mockByID = byID;
        const mockDemografics = demografics;

        mockByID.splice(this.getIndexOfArrayByObjectKey(byID, demografic), 1);
        mockDemografics.splice(mockDemografics.indexOf(demografic), 1);

        this.setState({
            byID: mockByID,
            demografics: mockDemografics,
            groups: [],
        });
    }

    editDemografic = (event) => {
        event.preventDefault();

        const { byID, demografic, demografics } = this.state;
        const mockByID = byID;
        const newDemografic = event.target.demografic.value;
        const mockDemografics = demografics;

        const byIDIndex = this.getIndexOfArrayByObjectKey(byID, demografic);
        const demograficsIndex = mockDemografics.indexOf(demografic);

        if (demograficsIndex >= 0) {
            mockDemografics[demograficsIndex] = newDemografic;

            mockByID[byIDIndex] = {
                [newDemografic]: Object.values(mockByID[byIDIndex])[0],
            };

            this.setState({
                byID: mockByID,
                demografics: mockDemografics,
            });
            
            this.closeModal();
        }
    }

    editUser = (data) => {
        const { employees } = this.state;
        let mock = {};
        let index = employees.findIndex(elem => elem.id === data.id);;

        mock = employees.filter(elem => elem.id === data.id)[0];
        mock = { ...mock, ...data };

        employees[index] = mock;

        this.setState({
            employees,
        });
    }

    firstLetterUppercase = (str) => (str.charAt(0).toUpperCase() + str.slice(1));

    getIndexOfArrayByObjectKey = (array, key) => {
        for (let i = 0; i < array.length; i++) {
            if (Object.keys(array[i])[0].toLowerCase() === key.toLowerCase()) {
                return i;
            }
        }
    }

    selectADemografic = (demografic) => {
        const { byID } = this.state;

        if (byID.map(obj => Object.keys(obj)[0]).includes(demografic)) {
            this.setState({
                demografic,
                group: "",
                groups: Object.values(byID.find(obj => Object.keys(obj)[0].toLowerCase() === demografic.toLowerCase()))[0],
            });
        }
    }

    selectAGroup = (group) => {
        this.setState({
            group,
        });
    }

    showDemograficAddModal = () => {
        this.setState({
            modal: {
                status: true,
                type: "add demografic"
            },
        });
    }

    showDemograficEditModal = () => {
        this.setState({
            modal: {
                status: true,
                type: "edit demografic"
            },
        });
    }

    showEmployeeModal = (employee) => {
        const { id, age, description, f_name, l_name, position } = employee;

        this.setState({
            modal: {
                status: true,
                type: "employee"
            },
            employee: {
                id,
                age,
                description,
                name: `${f_name} ${l_name}`,
                position,
            },
        })
    }

    render() {
        const { demografic, demografics, employee, employees, group, groups, modal } = this.state;

        return (
            <div className="Home">
                <div className="title">Employee directory</div>
                { demografics.length === 0 && (
                    <div
                        className="addNewDemografic"
                        onClick={this.showDemograficAddModal}
                    >
                        Add a demografic category
                    </div>
                )}
                { demografics.length > 0 &&
                    <SelectBar
                        array={demografics}
                        addDemografic={this.showDemograficAddModal}
                        deleteDemografic={this.deleteDemografic}
                        editDemografic={this.showDemograficEditModal}
                        isSelected={demografic.length > 0}
                        isDemografic={true}
                        select={this.selectADemografic}
                        title="Demografic Categories"
                    />
                }
                { demografic.length > 0 && groups.length > 0 &&
                    <SelectBar
                        array={groups}
                        isDemografic={false}
                        select={this.selectAGroup}
                        title="Groups"
                        type={demografic}
                    />
                }
                { group.length > 0 &&
                    <Employees
                        editUser={this.showEmployeeModal}
                        group={group}
                        list={employees}
                    />
                }
                { modal.status &&
                    <Modal
                        addDemografic={this.addDemografic}
                        closeModal={this.closeModal}
                        editDemografic={this.editDemografic}
                        data={
                            modal.type === "employee"
                            ? employee
                            : modal.type === "edit demografic"
                                ? { demografic: demografic }
                                : null
                        }
                        editUser={this.editUser}
                        type={modal.type}
                    />
                }
            </div>
        );
    }
}
