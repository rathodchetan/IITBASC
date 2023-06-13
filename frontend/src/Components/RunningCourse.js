import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import Navbar from "./Navbar";
import Cookies from "universal-cookie"
import "./style.css"
import "./tableStyle.css"
import "./link.css"
export default function RunningCourse() {

    let navigate = useNavigate();
    const cookies = new Cookies();

    var course_id = useParams().course_id;

    const [courseDetails, setCourseDetails] = useState({
        course_id: "",
        course_name: "",
        credits: "",
        venue: [{
            building: '',
            room: '',
            sec_id: ''
        }]
    });
    const [preReqDetails, setPreReqDetails] = useState([{
        course_id: '',
        course_name: ''
    }]);
    const [instDetails, setInstDetails] = useState([{
        inst_id: "",
        inst_name: ""
    }]);

    const setData = (data) => {
        // console.log(data.course_details)
        setCourseDetails(data.course_details);
        setPreReqDetails(data.preq_details);
        setInstDetails(data.inst_details);
        // console.log(data.course_details)
        console.log(data.preq_details)
        console.log(preReqDetails)

    };
    const getCourseDetails = () => {
        fetch(`http://localhost:8080/course/${course_id}`,
            {
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
                    // alert(data.err);
                    navigate('/login')
                }
                else {
                    // console.log(data)
                    console.log(data.response.response.preq_details);
                    setPreReqDetails(data.response.response.preq_details);
                    setData(data.response.response);
                }
            });
    };
    React.useEffect(() => {
        getCourseDetails();
    }, [course_id]);

    const changeState = (cid) => {
        course_id = cid;
        getCourseDetails();
    }



    return (
        <div className="body">
            <Navbar />
            <div className="alignCenter">

                <h2 className="heading">Course Details</h2>
                <table className="styled-table">
                    <thead>

                        <tr>
                            <th>Course ID</th>
                            <th>Course Name</th>
                            <th>Credits</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr>
                            <td>{courseDetails.course_id}</td>
                            <td>{courseDetails.course_name}</td>
                            <td>{courseDetails.credits}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br />
            <br />
            {/* <br /> */}
            <div className="alignCenter">{
                // check if venue is empty
                preReqDetails?.length > 0 ?
                    <div>
                        <h2 className="heading">Prerequisite Courses</h2>
                        <table className="styled-table">
                            <thead>

                                <tr>
                                    <th>Course ID</th>
                                    <th>Course Name</th>
                                </tr>
                            </thead>
                            <tbody>

                                {preReqDetails?.map((course) => (
                                    <tr>
                                        <Link to={"/course/" + course.course_id} onClick={() => { changeState(course.course_id) }} className='link'><td>{course.course_id}</td></Link>
                                        <td>{course.course_name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    : <h3 className="sub-heading">No Prerequisite</h3>


            }</div>
            <div className="alignCenter">{
                // check if venue is empty
                courseDetails.venue?.length > 0 ?
                    <div>
                        <h2 className="heading">Venue</h2>
                        <table className="styled-table">
                            <thead>
                                <tr>
                                    <th>Building</th>
                                    <th>Room</th>
                                    <th>Section ID</th>
                                </tr>
                            </thead>
                            <tbody>

                                {courseDetails.venue.map((venue) => (
                                    <tr>
                                        <td>{venue.building}</td>
                                        <td>{venue.room}</td>
                                        <td>{venue.sec_id}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    : <h3 className="sub-heading">No Venue</h3>
            }   </div>

            <div className="alignCenter">{
                // check if venue is empty
                instDetails?.length > 0 ?
                    <div>
                        <h2 className="heading">Instructors</h2>
                        <table className="styled-table">
                            <thead>
                                <tr>
                                    <th>Instructor ID</th>
                                    <th>Instructor Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {instDetails?.map((inst) => (
                                    <tr>
                                        <Link to={"/instructor/" + inst.inst_id} className='link'><td>{inst.inst_id}</td></Link>
                                        <td>{inst.inst_name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    : <h3 className="sub-heading">No Instructor For this Course</h3>
            }   </div>

            <br />
            <br />
            <br />
            <br />

        </div>
    )
}