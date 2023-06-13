import React, { useState, useEffect } from "react";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import Navbar from "./Navbar";
import Cookies from "universal-cookie";
import { Link, useNavigate } from 'react-router-dom'
import "./style.css"
import "./searchStyle.css"
import "./buttonStyle.css"
// import { Background } from "react-flow-renderer";

export default function Register() {
    const cookies = new Cookies();
    let navigate = useNavigate();
    const [items, setItems] = useState({
        id: "",
        name: "",
        sec_id: "",
    });
    const [itemSelected, setItemSelected] = useState([]);
    const [maybeData, setMaybeData] = useState([]);
    const [section, setSection] = useState('1');
    // each item is object of type {id:coure_id, name:course_name}


    const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        // navigate('/login')
        // console.log('data:', data)
        // handleData(string)
        console.log('Search')
        setMaybeData(results)
        console.log(results)
    }


    const handleOnHover = (result) => {
        // the item hovered
        console.log('hovered', result)
    }

    const handleOnSelect = async (item) => {
        // the item selected

        // need to fetch the data for the item selected

        // item.sec_id = fetchSectionList(item.id)
        setItemSelected([item]);

        //fetch the section data for the course selected

        console.log('select', item)
    }

    const handleOnFocus = () => {
        console.log('Focused')
        // console.log('here')
    }

    const formatResult = (item) => {
        return (
            <>
                {/* <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span> */}
                <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
            </>
        )
    }

    const getCourseList = () => {
        fetch("http://localhost:8080/course_list", {
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
                    console.log('response from course list')
                    console.log(data.response.response)
                    // console.log(data.response.user);
                    setData(data.response.response);
                }
            });
    };



    const setData = (data) => {
        // console.log(data.course_details)
        let value = []
        for (let i = 0; i < data.length; i++) {
            let item = { id: data[i].id, name: (data[i].id + ' : ' + data[i].course_name), sec_id: data[i].sec_id }
            // let item = { id: data[i].id, name: (data[i].id + ' : ' + data[i].course_name) }
            value.push(item)
            // console.log(items)
        }
        setItems(value)
        console.log(items)
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
                }
            });
    };

    const registerForCourse = (course_id, sec_id) => {

        console.log("register")
        console.log(course_id, sec_id)
        console.log(itemSelected)
        fetch("http://localhost:8080/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "course_id": course_id,
                "sec_id": sec_id
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
                    // navigate('/login')
                }
                else {
                    console.log(data.response.response)
                    if (data.response.response == 'Time') {
                        alert('There is Slot Conflict')
                        dropCourse(course_id)

                    }
                    else if (data.response.response == 'Prerequisite') {
                        alert('You have not completed the prerequisite course')
                        dropCourse(course_id)
                    }
                    else
                        // console.log(data.response.user);
                        // setData(data.response.response);
                        // getCourseList();
                        navigate('/home')
                }
            });
    };

    const displayItems = () => {

        // get section data for the course all in list selected
        console.log(maybeData)
        setItemSelected(maybeData)
    }

    const setSectionData = (e) => {
        setSection(e.target.value)
        console.log(section)
    }

    useEffect(() => {
        getCourseList()
    }, [])

    return (
        <div className="body">
            <Navbar />
            <br />
            <div className="wrap">.
                <div className="search">
                    <div className="alignCenter">

                        <button
                            onClick={displayItems}
                            className='button-85'
                        >Search</button>
                    </div>
                    <br />
                    <ReactSearchAutocomplete
                        items={items}
                        onHover={handleOnHover}
                        onSearch={handleOnSearch}
                        onSelect={handleOnSelect}
                        onFocus={handleOnFocus}
                        autoFocus
                        formatResult={formatResult}
                    />
                </div>
            </div>
            <br /><br /><br /><br />
            <div className="alignCenter margin">

                {
                    itemSelected.length > 0 ?
                        <div>
                            <table className="styled-table">
                                <thead>

                                    <tr>
                                        <th>Course Code</th>
                                        <th>Course Name</th>
                                        <th>Section</th>
                                        <th>Register</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {itemSelected.map((item) => {
                                        return (
                                            <tr>
                                                <td>{item.id}</td>
                                                <td>{item.name.split(':')[1]}</td>
                                                <td>
                                                    {/* dropdown */}
                                                    {/* with no initianl value */}
                                                    {/* <select onChange={setSectionData}
                                    // value={section}
                                    >
                                        <option value="1" selected>S1</option>
                                        <option value="2">S2</option>
                                        <option value="3">S3</option>
                                    </select> */}
                                                    <select onChange={setSectionData}
                                                        // value={section}
                                                        className='box'
                                                    >
                                                        <option disabled selected value className="inline-text"> section </option>
                                                        {item.sec_id.map((sec) => {
                                                            return (
                                                                <option value={sec}>S{sec}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </td>
                                                <td><button
                                                    onClick={
                                                        () => {
                                                            registerForCourse(item.id, section)
                                                        }
                                                    }
                                                    className='button-85'
                                                >Register</button></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div> : null
                }

                <br />
                <br />
            </div>

        </div>

    )




}

