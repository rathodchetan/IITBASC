import React from 'react';
import './form.css'
// import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Login() {
    let navigate = useNavigate();

    const [UserName, setUserName] = React.useState("");
    const [Password, setPassword] = React.useState("");

    const handleUserChange = (event) => {
        setUserName(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {

        // console.log(UserName, Password);
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "UserName": UserName,
                "Password": Password
            }),
            credentials: "include",
        }
        fetch("http://localhost:8080/login", requestOptions)
            .then(function (response) {
                console.log("in res")
                console.log(response.data)
                console.log(response);
                return response.json();
            })
            .then(function (data) {
                console.log("here")
                console.log(data.response)
                if (data.response == "Success") {
                    navigate('/home');

                }
                else {
                    alert("Invalid Credentials");
                    navigate('/login');
                }

            });

        event.preventDefault();
    }

    // return (
    //     <form >
    //         <label>
    //             UserName:
    //             <input type="text" required value={UserName} onChange={handleUserChange} />
    //         </label>
    //         <label>
    //             Password:
    //             <input type="password" required value={Password} onChange={handlePasswordChange} />
    //         </label>
    //         <button type="submit" onClick={handleSubmit}>Submit</button>
    //     </form>
    // );

    return (
        <div className='body'>
            <div class="login-box">
                <h2>Login</h2>
                <form>
                    <div class="user-box">
                        <input type="text" value={UserName} required onChange={handleUserChange} />
                        <label>Username</label>
                    </div>
                    <div class="user-box">
                        <input type="password" required value={Password} onChange={handlePasswordChange} />
                        <label>Password</label>
                    </div>
                    <a onClick={handleSubmit}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Submit
                    </a>
                </form>
            </div>
            <footer>
                <p>Designed by Ansh and Chetan</p>

            </footer>
        </div>
    )

}

// export default Form;