import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import './index.css';
import StarRating from "./StarRating";



const root = ReactDOM.createRoot(document.getElementById('root'));
// const message = ["Bad", "Okk", "Good", "Like it", "Awesome"];
root.render(
    <React.StrictMode>
        <App />


        {/* <StarRating maxRating={10} />
        <StarRating defaultRating={3} message={message} color="red" className="className" />
        <StarRating color="red" /> */}
    </React.StrictMode>
);