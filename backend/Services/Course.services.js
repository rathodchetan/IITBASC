const db = require('../Models/db_connection');


function getRunningCoursesDept(semester, year) {
    // console.log("helel")
    return new Promise((resolve, reject) => {
        var dept_items = {
            dept_name: []
        }
        // console.log("in service")
        // console.log(year, semester);

        db.query('select distinct dept_name from section natural join course where year = $1 and semester = $2', [year, semester], (error, results) => {
            if (error) {
                reject(error);
            }
            if (results.rows.length > 0) {
                // console.log('Department found')
                for (var i = 0; i < results.rows.length; i++) {
                    dept_items.dept_name.push(results.rows[i].dept_name);
                }
                resolve({ "status": 200, "error": null, "response": dept_items });
            }
            else {
                // console.log('No Department found');
                resolve({ "status": 401, "error": null, "response": null });
            }
        });
    });
}

function getRunningCourseDeptWise(dept, semester, year) {
    // console.log(dept, semester, year);
    return new Promise((resolve, reject) => {
        var course_items = []
        db.query('select course_id, title from section natural join course where year = $1 and semester = $2 and dept_name = $3', [year, semester, dept], (error, results) => {
            if (error) {
                reject(error);
            }
            if (results && results.rows.length > 0) {
                // console.log('Course found')
                for (var i = 0; i < results.rows.length; i++) {
                    course_items.push({
                        "course_id": results.rows[i].course_id,
                        "course_name": results.rows[i].title
                    });

                }
                resolve({ "status": 200, "error": null, "response": course_items });
            }
            else {
                // console.log('No Course found');
                resolve({ "status": 401, "error": null, "response": null });
            }
        });
    });
}

function getCourseDetails(course_id) {
    // console.log(course_id, 'here')
    return new Promise((resolve, reject) => {
        var data = {
            course_details: {},
            preq_details: {},
            inst_details: {}
        }
        var course_details = {
            course_id: course_id,
            course_name: '',
            credits: '',
            venue: []
        }
        db.query('select course_id, title, credits from course where course_id = $1', [course_id], (error, results) => {
            if (error) {
                reject(error);
            }
            if (results.rows.length > 0) {
                // console.log('Course found4')
                course_details.course_name = results.rows[0].title;
                course_details.credits = results.rows[0].credits;
                data.course_details = course_details;
                console.log('value1')
            }
            else {
                // console.log('No Course found4');
                resolve({ "status": 401, "error": null, "response": null });
            }
        });

        db.query('select course_id, title, credits, sec_id, building, room_number  from course natural join section where course_id = $1', [course_id], (error, results) => {
            if (error) {
                reject(error);
            }
            if (results) {
                // console.log('Course found---')
                for (var i = 0; i < results.rows.length; i++) {
                    course_details.venue.push({
                        "title": results.rows[i].title,
                        "building": results.rows[i].building,
                        "room": results.rows[i].room_number,
                        "sec_id": results.rows[i].sec_id
                    });
                }
                // console.log('value2')
                data.course_details = course_details;
            }
            else {
                // console.log('No Course found ---');
                resolve({ "status": 401, "error": null, "response": null });
            }
        });
        var preq_details = []
        db.query('select prereq_id, title from course inner join prereq on prereq_id = course.course_id where prereq.course_id = $1', [course_id], (error, results) => {
            if (error) {
                reject(error);
            }
            if (results) {
                // console.log('Course found2')
                for (var i = 0; i < results.rows.length; i++) {
                    preq_details.push({
                        "course_id": results.rows[i].prereq_id,
                        "course_name": results.rows[i].title
                    });
                }
                // console.log(preq_details)
                data.preq_details = preq_details;
                // console.log('value3')
            }
            else {
                // console.log('No Course found 2');
                resolve({ "status": 401, "error": null, "response": null });
            }
        });
        var inst_details = []
        db.query('select distinct ID,name from (course natural join teaches) as A inner join instructor using (id) where course_id = $1', [course_id], (error, results) => {
            if (error) {
                reject(error);
            }
            if (results) {
                // console.log('Course found3')

                for (var i = 0; i < results.rows.length; i++) {
                    inst_details.push({
                        "inst_id": results.rows[i].id,
                        "inst_name": results.rows[i].name
                    });
                }
                data.inst_details = inst_details;
                // console.log('value4')
                // console.log(data)
                resolve({ "status": 200, "error": null, "response": data });
            }
            else {
                // console.log('No Course found 3');
                resolve({ "status": 401, "error": null, "response": null });
            }
        }
        );


    });
}

function dropCourse(course_id, user_id, semester, year) {
    // console.log(course_id, user_id, semester, year);

    return new Promise((resolve, reject) => {
        const query = "delete from takes where course_id = '" + parseInt(course_id).toString() + "' and id = '" + parseInt(user_id).toString() + "' and semester = '" + semester + "' and year = '" + parseInt(year).toString() + "';";
        // console.log(query)
        db.query(query, [], (error, results) => {
            if (error) {
                console.log(error)
                reject(error);
            }
            if (results) {

                // console.log('Course dropped')
                // console.log(results)
                resolve({ "status": 200, "error": null, "response": "Course dropped" });
            }
            else {
                // console.log('No Course dropped');
                resolve({ "status": 401, "error": null, "response": null });
            }
        });
    });
}

function getRunningCourse(semester, year) {
    console.log(semester, year);
    return new Promise((resolve, reject) => {
        var course_items = []
        db.query('select course_id, title, sec_id from section natural join course where semester = $1 and year = $2 order by course_id', [semester, year], (error, results) => {
            if (error) {
                reject(error);
            }
            if (results.rows.length > 0) {
                // console.log('Course found1');
                var data = {
                    "id": results.rows[0].course_id,
                    "course_name": results.rows[0].title,
                    "sec_id": [results.rows[0].sec_id]
                }
                course_items.push(data)
                for (let i = 1; i < results.rows.length; i++) {
                    if (results.rows[i].course_id == results.rows[i - 1].course_id) {
                        course_items[course_items.length - 1].sec_id.push(results.rows[i].sec_id)
                    }
                    else {
                        var data = {
                            "id": results.rows[i].course_id,
                            "course_name": results.rows[i].title,
                            "sec_id": [results.rows[i].sec_id]
                        }
                        course_items.push(data)
                    }
                }
                // console.log(course_items)
                // console.log('Course found4');
                resolve({ "status": 200, "error": null, "response": course_items });
            }
            else {
                // console.log('No Course found4');
                reject({ "status": 401, "error": null, "response": null });
            }
        });
    });
}

function getSectionId(course_id, semester, year) {

    return new Promise((resolve, reject) => {
        var sec_id = []
        db.query('select sec_id from section where course_id = $1 and semester = $2 and year = $3 order by sec_id', [course_id, semester, year], (error, results) => {
            if (error) {
                reject(error);
            }
            if (results.rows.length > 0) {
                // console.log('Course found1');
                for (let i = 0; i < results.rows.length; i++) {
                    // console.log("i = " + i + "");

                    sec_id.push(results.rows[i].sec_id)
                    // console.log(sec_id)

                }
                // console.log(course_items)
                // console.log('Course found4');
                resolve({ "status": 200, "error": null, "response": sec_id });
            }
            else {
                // console.log('No Course found4');
                reject({ "status": 401, "error": null, "response": null });
            }
        });
    });
}

function getAllCourses() {
    return new Promise((resolve, reject) => {
        db.query('select * from course order by dept_name,course_id', [], (error, results) => {
            if (error) {
                reject(error);
            }
            if (results) {
                // console.log('Course found')
                resolve({ "status": 200, "error": null, "response": results.rows });
            }
            else {
                // console.log('No Course found');
                resolve({ "status": 401, "error": null, "response": null });
            }
        });
    });
}



module.exports = {
    getRunningCoursesDept,
    getRunningCourseDeptWise,
    getCourseDetails,
    dropCourse,
    getRunningCourse,
    getSectionId,
    getAllCourses
}

