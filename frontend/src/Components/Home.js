import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./style.css"
import "./tableStyle.css"
import "./buttonStyle.css"
import "./link.css"

export default function Home() {
    let navigate = useNavigate();
    const [studentDetails, setStudentDetails] = useState({
        id: "",
        name: "",
        dept_name: "",
        tot_cred: "",
        current_course_list: [],
        past_course_list: [], // this is list of json object {semester,year,course_list}
    });

    const setData = (data) => {
        // console.log(data.course_details)
        setStudentDetails(data);
    };
    const getHomeDetails = () => {
        fetch("http://localhost:8080/home", {
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
                    setData(data.response.response);
                }
            });


    };

    const dropCourse = (course_id) => {
        fetch("http://localhost:8080/drop_course", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "course_id": course_id,
            }),
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
                else {
                    console.log(data.response.response)
                    // console.log(data.response.user);
                    // setData(data.response.response);
                    // navigate('/home')
                    getHomeDetails();

                }
            });
    };





    React.useEffect(() => {
        getHomeDetails();
    }, []);

    return (

        <div className="body" >
            <Navbar />

            {/* <h1>Welcome </h1> */}
            <div className="alignCenter" >
                {
                    studentDetails.id !== "" ?
                        <div>
                            <h2 className="heading">Student Details</h2>
                            {/* <p>Student ID: {studentDetails.id}</p>
                <p>Student Name: {studentDetails.name}</p>
                <p>Department: {studentDetails.dept_name}</p>
                <p>Total Credits: {studentDetails.tot_cred}</p> */}
                            <table class="styled-table table-border">
                                <tbody>
                                    <tr>
                                        <td className="style-column">Student ID</td>
                                        <td>{studentDetails.id}</td>
                                    </tr>
                                    <tr>
                                        <td className="style-column">Student Name</td>
                                        <td>{studentDetails.name}</td>
                                    </tr>
                                    <tr>
                                        <td className="style-column">Department</td>
                                        <td>{studentDetails.dept_name}</td>
                                    </tr>
                                    <tr>
                                        <td className="style-column">Total Credits</td>
                                        <td>{studentDetails.tot_cred}</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div> : <div className="sub-heading">Instructor</div>
                }
            </div >
            <div className="alignCenter">
                {

                    studentDetails.current_course_list.length > 0 ?
                        <div>
                            <h2 className="heading">Current Courses</h2>

                            <table class="styled-table">
                                <thead>
                                    <tr>
                                        <th>Course ID</th>
                                        <th>Course Name</th>
                                        <th>Drop Course</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentDetails.current_course_list.map((course) => (
                                        <tr>
                                            <Link to={"/course/" + course.course_id} className="link"><td>{course.course_id}</td></Link>
                                            <td>{course.course_name}</td>
                                            <td><button className="button-86" onClick={
                                                () => {
                                                    dropCourse(course.course_id);
                                                }
                                            }>Drop</button></td>
                                        </tr>

                                    ))}
                                </tbody>
                            </table></div> : <h2 className="sub-heading">No Current Courses</h2>
                }

            </div>


            <div className="alignCenter">
                {
                    studentDetails.past_course_list.length > 0 ?
                        <div>
                            <h2 className="heading">Past Courses</h2>
                            {studentDetails.past_course_list.map((semester) => (
                                <div className="alignCenter">
                                    <h3 className="sub-heading">{semester.semester} {semester.year}</h3>
                                    <table class="styled-table">
                                        <thead>

                                            <tr>
                                                <th>Course ID</th>
                                                <th>Course Name</th>
                                                <th>Grade</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {semester.course_list.map((course) => (
                                                <tr>
                                                    <Link to={"/course/" + course.course_id} className="link"><td>{course.course_id}</td></Link>
                                                    <td>{course.course_name}</td>
                                                    <td>{course.grade}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                </div>
                            ))}
                        </div> : <h2 className="sub-heading">No Past Courses</h2>
                }

            </div>
            <br />
            <br />
            <br />
            <br />
        </div >
    );
}
