import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";
import Cookies from 'universal-cookie';
import "./style.css"
import "./tableStyle.css"
import "./link.css"

export default function RunningDept() {
    let navigate = useNavigate();
    const cookies = new Cookies();
    const [dept_list, setDept_list] = useState([]);

    const getDept = () => {
        fetch("http://localhost:8080/course/running", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        })
            .then(function (response) {
                // console.log(response)
                return response.json();
            })
            .then((data) => {
                // if (data.response.response.err)
                console.log(data.err)
                if (data.err) {
                    // console.log(data.err);
                    // alert(data.err);
                    navigate('/login')
                }
                else {

                    console.log(data.response.response.dept_name);
                    setDept_list(data.response.response.dept_name);
                }
            });

    };
    React.useEffect(() => {
        getDept();
    }, []);


    return (
        <div className='body'>
            <Navbar />
            <br />
            <br />
            <div className='alignCenter'>
                {
                    dept_list.length > 0 ?
                        <div>

                            <table className='styled-table'>
                                <thead>
                                    <tr>
                                        <th>Department</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {dept_list.map((dept) => (
                                        <tr>
                                            <Link to={'/course/running/' + dept} className='link'><td>{dept}</td></Link>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div> : <h2 className='sub-heading'>No Department Offering Course</h2>
                }
            </div>
            <br />
            <br />
            <br />
            <br />
        </div>
    );

}
