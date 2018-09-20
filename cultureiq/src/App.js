import React, { Component } from 'react';
import Home from "./components/Home";
import './App.css';

class App extends Component {
    render() {
        // Assumption: The below variables would be populated upon an API call.
        const byID = [
            { "Location": ["New York", "Tokyo", "New Dehli", "Rio de Janeiro", "Frankfurt"] },
            { "Age": ["18-27", "28-37", "38-47", "48-57", "58-67"] },
            { "Gender": ["Male", "Female", "Other"] },
        ];
        const employees = [
            {
                id: "1",
                age: "40",
                f_name: "Adam",
                gender: "Male",
                l_name: "Doe",
                location: "New York",
                image: "https://randomuser.me/api/portraits/lego/1.jpg",
                position: "Enthusiast",
                description: "Some description should go here, I think we can all agree that it should not be too long either, just about this long."
            },
            {
                id: "2",
                age: "50",
                f_name: "Brian",
                gender: "Male",
                l_name: "Doe",
                location: "Tokyo",
                image: "https://randomuser.me/api/portraits/lego/2.jpg",
                position: "Fanatic",
                description: "Some description should go here, I think we can all agree that it should not be too long either, just about this long."
            },
            {
                id: "3",
                age: "18",
                f_name: "Ursula",
                gender: "Female",
                l_name: "Doe",
                location: "New Dehli",
                image: "https://randomuser.me/api/portraits/lego/3.jpg",
                position: "Curious",
                description: "Some description should go here, I think we can all agree that it should not be too long either, just about this long."
            },
            {
                id: "4",
                age: "24",
                f_name: "Michelle",
                gender: "Other",
                l_name: "Doe",
                location: "Rio de Janeiro",
                image: "https://randomuser.me/api/portraits/lego/4.jpg",
                position: "Very curious",
                description: "Some description should go here, I think we can all agree that it should not be too long either, just about this long."
            },
            {
                id: "5",
                age: "18",
                f_name: "Katherine",
                gender: "Female",
                l_name: "Doe",
                location: "Frankfurt",
                image: "https://randomuser.me/api/portraits/lego/5.jpg",
                position: "Curious",
                description: "Some description should go here, I think we can all agree that it should not be too long either, just about this long."
            },
            {
                id: "6",
                age: "48",
                f_name: "Papa",
                gender: "Male",
                l_name: "Doe",
                location: "New York",
                image: "https://randomuser.me/api/portraits/lego/6.jpg",
                position: "Settled",
                description: "Some description should go here, I think we can all agree that it should not be too long either, just about this long."
            },
            {
                id: "7",
                age: "54",
                f_name: "Evelyn",
                gender: "Female",
                l_name: "Doe",
                location: "Tokyo",
                image: "https://randomuser.me/api/portraits/lego/7.jpg",
                position: "Up there",
                description: "Some description should go here, I think we can all agree that it should not be too long either, just about this long."
            },
            {
                id: "8",
                age: "39",
                f_name: "Lola",
                gender: "Other",
                l_name: "Doe",
                location: "New Dehli",
                image: "https://randomuser.me/api/portraits/lego/8.jpg",
                position: "Not curious anymore or any longer",
                description: "Some description should go here, I think we can all agree that it should not be too long either, just about this long."
            },
            {
                id: "9",
                age: "33",
                f_name: "Victor",
                gender: "Male",
                l_name: "Doe",
                location: "New York",
                image: "https://randomuser.me/api/portraits/lego/9.jpg",
                position: "Also curious",
                description: "Some description should go here, I think we can all agree that it should not be too long either, just about this long."
            },
            {
                id: "10",
                age: "34",
                f_name: "Omar",
                gender: "Male",
                l_name: "Doe",
                location: "Tokyo",
                image: "https://randomuser.me/api/portraits/lego/2.jpg",
                position: "Down here",
                description: "Some description should go here, I think we can all agree that it should not be too long either, just about this long."
            },
            {
                id: "11",
                age: "65",
                f_name: "Ian",
                gender: "Other",
                l_name: "Doe",
                location: "New Dehli",
                image: "https://randomuser.me/api/portraits/lego/4.jpg",
                position: "Not curious anymore or any longer",
                description: "Some description should go here, I think we can all agree that it should not be too long either, just about this long."
            },
            {
                id: "12",
                age: "20",
                f_name: "Raul",
                gender: "Male",
                l_name: "Doe",
                location: "Rio de Janeiro",
                image: "https://randomuser.me/api/portraits/lego/3.jpg",
                position: "Also curious",
                description: "Some description should go here, I think we can all agree that it should not be too long either, just about this long."
            },
            {
                id: "13",
                age: "24",
                f_name: "Paula",
                gender: "Female",
                l_name: "Doe",
                location: "Tokyo",
                image: "https://randomuser.me/api/portraits/lego/2.jpg",
                position: "Up there",
                description: "Some description should go here, I think we can all agree that it should not be too long either, just about this long."
            },
            {
                id: "14",
                age: "51",
                f_name: "Terry",
                gender: "Other",
                l_name: "Doe",
                location: "Frankfurt",
                image: "https://randomuser.me/api/portraits/lego/1.jpg",
                position: "Not curious anymore or any longer",
                description: "Some description should go here, I think we can all agree that it should not be too long either, just about this long."
            },
            {
                id: "15",
                age: "62",
                f_name: "Anna",
                gender: "Female",
                l_name: "Doe",
                location: "New York",
                image: "https://randomuser.me/api/portraits/lego/9.jpg",
                position: "Also curious",
                description: "Some description should go here, I think we can all agree that it should not be too long either, just about this long."
            },
        ];

        return (
            <div className="App">
                <Home byID={byID} employees={employees} />
            </div>
        );
    }
}

export default App;
