const db = require('../Models/db_connection');

function getInstructorDetails(instructor_id, semester, year) {
    return new Promise((resolve, reject) => {
        var instructor_details = {
            name: "",
            department: "",
            current_course_list: [],
            past_course_list: []
        }
        db.query('select id,name,dept_name from instructor where id = $1', [instructor_id], (error, results) => {
            if (error) {
                reject(error);
            }
            if (results) {
                // console.log('Instructor found')
                instructor_details.name = results.rows[0].name;
                instructor_details.department = results.rows[0].dept_name;
            }
            else {
                // console.log('Instructor not found')
                resolve({ "status": 401, "error": null, "response": null });
            }
        });

        db.query('select id, name , course_id , title , A.dept_name, sec_id, semester, year from (instructor natural join teaches) as A join course using (course_id) WHERE id = $1 and semester = $2 and year = $3 order by course_id', [instructor_id, semester, year], (error, results) => {
            if (error) {
                reject(error);
            }
            if (results) {
                // console.log('Instructor found1')
                // console.log(results.rows)
                var current_course_list = [];
                for (var i = 0; i < results.rows.length; i++) {
                    current_course_list.push({
                        "course_id": results.rows[i].course_id,
                        "course_name": results.rows[i].title,
                    });
                }
                instructor_details.current_course_list = current_course_list;
                // resolve({ "status": 200, "error": null, "response": instructor_details });
            }
            else {
                // console.log('Instructor not found')
                resolve({ "status": 401, "error": null, "response": null });
            }
        });


        db.query('select id, name , course_id , title , A.dept_name, sec_id, semester, year from (instructor natural join teaches) as A join course using (course_id) WHERE id = $1 and (semester != $2 or year != $3) order by year desc, semester desc, course_id', [instructor_id, semester, year], (error, results) => {
            if (error) {
                reject(error);
            }
            if (results) {
                // console.log('Instructor found2')
                // console.log(results.rows)
                var past_course_list = [];
                for (var i = 0; i < results.rows.length; i++) {
                    past_course_list.push({
                        "course_id": results.rows[i].course_id,
                        "course_name": results.rows[i].title,
                    });
                }
                instructor_details.past_course_list = past_course_list;
                resolve({ "status": 200, "error": null, "response": instructor_details });
            }
            else {
                // console.log('Instructor not found2')
                resolve({ "status": 401, "error": null, "response": results.rows });
            }
        });
    });
}

function getAllInstructors() {
    return new Promise((resolve, reject) => {
        db.query('select id, name, dept_name from instructor order by dept_name, id', (error, results) => {
            if (error) {
                reject(error);
            }
            if (results) {
                // console.log('Instructor found')
                resolve({ "status": 200, "error": null, "response": results.rows });
            }
            else {
                // console.log('Instructor not found')
                resolve({ "status": 401, "error": null, "response": null });
            }
        });
    });
}

module.exports = {
    getInstructorDetails,
    getAllInstructors
}
