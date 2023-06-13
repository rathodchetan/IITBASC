import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Cookies from "universal-cookie"
import "./style.css"
import "./tableStyle.css"
import "./link.css"
export default function AllCourses() {
    var navigate = useNavigate();
    const cookies = new Cookies();
    const [courseList, setCourseList] = useState([]);

    const getAllCourses = () => {
        fetch(`http://localhost:8080/course`)
            .then(function (response) {
                console.log(response)
                return response.json();
            }
            )
            .then((data) => {
                if (data.err) {
                    navigate('/login')
                }
                else {
                    console.log(data.response.response);
                    setCourseList(data.response.response);
                }
            });
    };
    React.useEffect(() => {
        getAllCourses();
    }, []);

    return (
        <div className="body">
            <Navbar />
            <div className="alignCenter">
                <h2 className="heading">Course List</h2>
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>Course ID</th>
                            <th>Course Name</th>
                            <th>Department</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courseList.map((course) => (
                            <tr>
                                <Link to={"/course/" + course.course_id} className="link"><td>{course.course_id}</td></Link>
                                <td>{course.title}</td>
                                <td>{course.dept_name}</td>
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
