import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./style.css"

import "./tableStyle.css"

import "./link.css"
export default function DeptRunCourse() {
    // get value from /course/running/:dept_name

    let navigate = useNavigate();

    var dept_name = useParams().dept_name;
    const [courseList, setCourseList] = useState([]);

    const setValue = (data) => {
        console.log(data)
        setCourseList(data);
    };


    const getCourseList = () => {
        console.log(dept_name)
        fetch(`http://localhost:8080/course/running/${dept_name}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        })
            .then(function (response) {
                console.log(response)
                return response.json();
            })
            .then((data) => {
                if (data.err) {
                    navigate('/login')
                }
                else {
                    console.log(data.response.response);
                    setValue(data.response.response);
                }
            });
    };
    React.useEffect(() => {
        getCourseList();
    }, []);


    return (
        <div className="body">
            <Navbar />
            <div className="alignCenter getSpace">

                {/* <h2 className="heading">Department Name</h2>
                <div>{dept_name}</div> */}
                {/* <h2 className="heading">Department Name</h2> */}
                <table className="styled-table">
                    <tbody>
                        <tr>
                            <td className="color-column">Department Name</td>
                            <td>{dept_name}</td>
                        </tr>
                    </tbody>
                </table>

            </div>
            <div className="alignCenter">

                <h2 className="heading">Current Course List</h2>
                <table className="styled-table">
                    <thead>

                        <tr>
                            <th>Course ID</th>
                            <th>Course Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courseList.map((course) => (
                            <tr>
                                <Link to={"/course/" + course.course_id} className='link'><td>{course.course_id}</td></Link>
                                <td>{course.course_name}</td>
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
    );
}