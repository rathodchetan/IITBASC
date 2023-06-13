import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Cookies from "universal-cookie"
import "./style.css"
import "./tableStyle.css"
import "./buttonStyle.css"
import "./link.css"

export default function Instructor() {

    let navigate = useNavigate();
    const cookies = new Cookies();
    // get value from /instructor/:instructor_id
    var instructor_id = useParams().instructor_id;

    const [instructorDetails, setInstructorDetails] = useState({
        name: "",
        department: "",
        current_course_list: [],
        past_course_list: [],
    });

    // set instructor details
    const FuncinstructorDetails = (data) => {
        setInstructorDetails({
            name: data.name,
            department: data.department,
            current_course_list: data.current_course_list,
            past_course_list: data.past_course_list,
        });
    };

    // fetch instructor details from backend
    const getInstructorDetails = () => {
        fetch(`http://localhost:8080/instructor/${instructor_id}`, {
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
                    console.log(data.err);
                    // alert(data.err);
                    navigate('/login')
                }
                else {
                    console.log(data.response.response);
                    FuncinstructorDetails(data.response.response);
                }
            });
    };
    React.useEffect(() => {
        getInstructorDetails();
    }, []);

    return (
        <div className="body">

            <Navbar />
            <br />
            <br />
            <div className="alignCenter">
                <table className="styled-table table-border">
                    <tbody>
                        <tr>

                            <td className="style-column">Instructor Name</td>
                            <td>{instructorDetails.name}</td>
                        </tr>
                        <tr>
                            <td className="style-column">Department</td>
                            <td>{instructorDetails.department}</td>
                        </tr>

                    </tbody>
                </table>
            </div>

            <div className="alignCenter">{
                instructorDetails.current_course_list.length > 0 ?
                    <div>


                        <h2 className="heading">Current Course List</h2>
                        <table className="styled-table">
                            <thead>

                                <tr>
                                    <th>Course ID</th>
                                    <th>Course Name</th>
                                </tr>
                            </thead>
                            <tbody>


                                {instructorDetails.current_course_list.map((course) => (
                                    <tr>
                                        <Link to={"/course/" + course.course_id} className='link'><td>{course.course_id}</td></Link>
                                        <td>{course.course_name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    : <h3 className="sub-heading">No Offerings Currently</h3>
            }

            </div>
            <div className="alignCenter">
                {

                    instructorDetails.past_course_list.length > 0 ?
                        <div>
                            <h2 className="heading">Past Course List</h2>
                            <table className="styled-table">
                                <thead>

                                    <tr>
                                        <th>Course ID</th>
                                        <th>Course Name</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {instructorDetails.past_course_list.map((course) => (
                                        <tr>
                                            <Link to={"/course/" + course.course_id} className='link'><td>{course.course_id}</td></Link>
                                            <td>{course.course_name}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        : <h3 className="sub-heading">No Past Offerings</h3>}
            </div>
            <br />
            <br />
            <br />
            <br />
        </div>
    );
}