import React from "react";

const Home = () => {
    const images = JSON.parse(localStorage.getItem("images"));
    // const categories = images && Object.keys(images);

    return (
        <div className="Home">
            Home
        </div>
    );
};

export default Home;