import React from 'react';
import { Link } from "react-router-dom";
import "./style.css"
import "./tableStyle.css"
import "./buttonStyle.css"
import "./link.css"

export default function navbar() {


    const handleLogout = () => {
        fetch("http://localhost:8080/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        })
            .then(function (response) {
                // console.log(response)

                return response.json();
            })
            .then((data) => {
                if (data.err) {
                    alert(data.err);
                }

            });
    };

    return (
        <div className="container">

            <ul className="ul">
                <li className="li"><Link to="/home" className="anchor" >Home</Link></li>
                <li className="li"><Link to="/home/register" className="anchor" >Register</Link></li>
                <li className="li"><Link to="/course/running" className="anchor">Department Offerings</Link></li>
                <li className="li"><Link to="/course" className="anchor">All Courses</Link></li>
                <li className="li"><Link to="/instructor" className="anchor" >Instructors</Link></li>
                <li className="li"><Link to="/login" onClick={handleLogout} className="anchor" >Logout</Link></li>
                <li className="li"><span className="anchor title">IITB ASC</span></li>
            </ul>

        </div>
    )
}