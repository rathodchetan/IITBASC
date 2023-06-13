import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./style.css"
import "./tableStyle.css"
import "./link.css"

export default function AllInstructor() {
    var navigate = useNavigate();

    const [instDetails, setInstDetails] = useState([]);

    const getAllInstructors = (event) => {
        fetch("http://localhost:8080/instructor", {
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
                    // alert(data.err);
                    navigate('/login')
                }
                else {
                    console.log(data.response.response)
                    // console.log(data.response.user);
                    setInstDetails(data.response.response);
                }
            });
    };

    React.useEffect(() => {
        getAllInstructors();
    }
        , []);


    return (
        <div className="body">
            <Navbar />
            <div className="alignCenter">
                <h2 className="heading">All Instructors</h2>
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>Instructor ID</th>
                            <th>Instructor Name</th>
                            <th>Department</th>
                        </tr>
                    </thead>
                    <tbody>
                        {instDetails.map((inst) => (
                            <tr>
                                <Link to={"/instructor/" + inst.id} className="link"><td>{inst.id}</td></Link>
                                <td>{inst.name}</td>
                                <td>{inst.dept_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <br />
            <br />
            <br />
            <br />
        </div>
    )
}




