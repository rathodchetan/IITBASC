const db = require('../Models/db_connection');

function getHomeDetails(user_id, semester, year) {
    // user_id = '1018'
    return new Promise((resolve, reject) => {
        // resolve({ "status": 200, "error": null, "response": "Hello" });
        var data = {
            id: "",
            name: "",
            dept_name: "",
            tot_cred: "",
            current_course_list: [],
            past_course_list: [], // this is list of objects
        }

        db.query('select * from student where id = $1', [user_id], (error, results) => {
            if (error) {
                reject(error);
            }
            if (results.rows.length > 0) {
                // console.log('Student found')
                data.id = results.rows[0].id;
                data.name = results.rows[0].name;
                data.dept_name = results.rows[0].dept_name;
                data.tot_cred = results.rows[0].tot_cred;
            }
            else {
                // console.log('Student not found')
                resolve({ "status": 401, "error": null, "response": data });
            }
        });

        db.query("select course_id , title , grade ,id , semester , year , case semester when 'Spring' then 1 when 'Summer' then 2 when 'Fall' then 3 when 'Winter' then 4 end as sorting from takes natural join course where id = $1 order by year desc, sorting desc; ", [user_id], (error, results) => {
            if (error) {
                reject(error);
            }
            if (results.rows.length > 0) {
                // console.log('Student found')
                var current_course_list = [];
                // set of semester and year tuple
                var semester_list = [];

                for (var i = 0; i < results.rows.length; i++) {
                    if (results.rows[i].semester == semester && results.rows[i].year == year) {
                        current_course_list.push({
                            "course_id": results.rows[i].course_id,
                            "course_name": results.rows[i].title,
                        });
                    }
                    else {
                        if (semester_list[semester_list.length - 1] != results.rows[i].year + " " + results.rows[i].semester)
                            semester_list.push(results.rows[i].year + " " + results.rows[i].semester);
                    }
                }

                // convert set to list
                // var semester_list = Array.from(semester_set);
                // sort the list in descending order
                // semester_list.sort().reverse();

                // for each semester get the list of course and grade
                for (var i = 0; i < semester_list.length; i++) {
                    let semester = semester_list[i].split(" ")[1];
                    let year = semester_list[i].split(" ")[0];
                    var past_course_list = [];
                    for (var j = 0; j < results.rows.length; j++) {
                        if (results.rows[j].semester == semester && results.rows[j].year == year) {
                            past_course_list.push({
                                "course_id": results.rows[j].course_id,
                                "course_name": results.rows[j].title,
                                "grade": results.rows[j].grade
                            });
                        }
                    }
                    data.past_course_list.push({
                        "semester": semester,
                        "year": year,
                        "course_list": past_course_list
                    });
                }
                data.current_course_list = current_course_list;
                resolve({ "status": 200, "error": null, "response": data });
            }
            else {
                // console.log('Student not found')
                resolve({ "status": 401, "error": null, "response": null });
            }
        });
    });

}

function registerCourse(course_id, user_id, sec_id, semester, year) {
    console.log(course_id, user_id, sec_id, semester, year);

    return new Promise((resolve, reject) => {
        // var output = { status: '' };
        var time_slot = '';
        var past_course_list = [];
        db.query('select time_slot_id from section natural join time_slot where course_id = $1 and sec_id = $2 and semester = $3 and year = $4', [course_id, sec_id, semester, year], (error, results) => {
            if (error) {
                return (error);
            }
            if (results.rows.length > 0) {
                time_slot = results.rows[0].time_slot_id;
                // console.log(time_slot);
            }
            else {
                time_slot = '-1';
            }
        });

        // console.log(res2)
        // console.log('going to check time slot conflict', time_slot)


        db.query('select time_slot_id from takes natural join section natural join time_slot where id = $1 and semester = $2 and year = $3', [user_id, semester, year], (error, results) => {
            if (error) {
                reject(error);
            }
            if (results) {
                // console.log('Checking found---')
                for (var i = 0; i < results.rows.length; i++) {
                    console.log('in for loop', time_slot)
                    if (results.rows[i].time_slot_id == time_slot) {
                        console.log('Time slot conflict')
                        // return ({ "status": 401, "error": null, "response": null, "message": "Time slot conflict" });
                        resolve({ "status": 401, "error": null, "response": 'Time' });
                        // output = { "status": 401, "error": null, "response": null, "message": "Time slot conflict" };
                        break;
                    }
                    // console.log('in for loop')
                }
            }
        });

        db.query('select course_id from takes where id = $1 and (semester != $2 or year != $3)', [user_id, semester, year], (error, results) => {
            if (error) {
                reject(error);
            }
            if (results.rows.length > 0) {
                for (var i = 0; i < results.rows.length; i++) {
                    past_course_list.push(results.rows[i].course_id);
                }
            }
        });

        db.query('select *  from prereq where course_id = $1', [course_id], (error, results) => {
            if (error) {
                reject(error);
            }
            if (results.rows.length > 0) {
                var present = false;
                for (var i = 0; i < results.rows.length; i++) {
                    for (var j = 0; j < past_course_list.length; j++) {
                        if (past_course_list[j] == results.rows[i].prereq_id) {
                            present = true;
                            console.log('prereq not satisfied')
                            break;
                        }
                    }
                    if (!present) {
                        resolve({ "status": 401, "error": null, "response": 'Prerequisite' });
                    }
                }

            }
        });

        db.query('insert into takes values ($1, $2, $3, $4, $5, null)', [user_id, course_id, sec_id, semester, year], (error, results) => {
            if (error) {
                reject(error);
            }
            if (results) {
                console.log('Course registered')
                resolve({ "status": 200, "error": null, "response": 'Success' });
            }
        });

        return ({ "status": 200, "error": null, "response": 'Failure' });
    });
};

function getAllDepartments() {
    return new Promise((resolve, reject) => {
        db.query('select distinct dept_name from department', (error, results) => {
            if (error) {
                reject(error);
            }
            if (results.rows.length > 0) {
                var dept_list = [];
                for (var i = 0; i < results.rows.length; i++) {
                    dept_list.push(results.rows[i].dept_name);
                }
                resolve({ "status": 200, "error": null, "response": dept_list });
            }
            else {
                resolve({ "status": 401, "error": null, "response": null });
            }
        });
    });
}

function getDepartmentDetails(dept_name) {
    return new Promise((resolve, reject) => {
        db.query('select course_id, title, credits from course where dept_name = $1', [dept_name], (error, results) => {
            if (error) {
                reject(error);
            }
            if (results.rows.length > 0) {
                var course_list = [];
                for (var i = 0; i < results.rows.length; i++) {
                    course_list.push({
                        "course_id": results.rows[i].course_id,
                        "title": results.rows[i].title,
                        "credits": results.rows[i].credits
                    });
                }
                resolve({ "status": 200, "error": null, "response": course_list });
            }
            else {
                resolve({ "status": 401, "error": null, "response": null });
            }
        });
    });
}


module.exports = {
    getHomeDetails,
    registerCourse,
    getAllDepartments,
    getDepartmentDetails
}
