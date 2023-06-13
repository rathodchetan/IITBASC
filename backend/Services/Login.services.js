const db = require('../Models/db_connection');
const { sign } = require('jsonwebtoken');
// import bycrpt from 'bcryptjs';
const bycrpt = require('bcrypt');


function getLoginInfo(UserName, Password) {

    return new Promise((resolve, reject) => {
        var role = '';
        db.query('SELECT * FROM instructor WHERE id = $1', [UserName], (error, results) => {
            if (error) {
                reject(error);
            }
            if (results.rows.length > 0) {
                role = "instructor"
            }
            else {
                role = "student"
            }
        });

        db.query('SELECT * FROM user_password WHERE id = $1', [UserName], (error, results) => {
            if (error) {
                reject(error);
            }
            if (results.rows.length > 0) {
                // console.log('Login success')
                hashedPassword = results.rows[0].hashed_password;
                if (hashedPassword == "") {
                    resolve({ err: "Access Denied", status: "" })
                }
                bycrpt.compare(Password, hashedPassword).then((result) => {
                    if (result) {
                        console.log('Login success')
                        console.log(role)

                        resolve({ "status": 200, "error": null, "response": { "role": role, status: "Success" } });
                    }
                    else {
                        console.log('Login fail')
                        resolve({
                            err: "Access Denied",
                            status: ""
                        })
                    }
                });
            }
            else {
                console.log('Login fail');
                // resolve({ "status": 401, "error": null, "response": results.rows });
                reject({ err: "Access Denied" });
            }
        });
    });


    // var data = {
    //     "UserName": UserName,
    //     "Password": Password
    // }
    // db.query('SELECT * FROM web_user WHERE id = $1 AND hashed_password = $2', [UserName, Password], (error, results) => {
    //     if (error) {
    //         console.log('threo')
    //         throw error;
    //     }

    //     if (results.rows.length > 0) {
    //         console.log('success')
    //         return JSON.parse({ "status": 200, "error": null, "response": results.rows });
    //     }
    //     else {
    //         console.log('fail')
    //         return JSON.parse({ "status": 401, "error": null, "response": results.rows });
    //     }

    // });
}

module.exports = {
    getLoginInfo
}


