const services = require('../Services/Home.services');
const DateController = require('./Date.controller');
const getHomeDetails = async (req, res) => {
    // const user_id = req.user.id;
    const user_id = req.session.user;
    console.log('in home')
    console.log(req.session)
    var semester = '';
    var year = '';
    await DateController.DateTime().then((data) => {
        semester = data.semester;
        year = data.year;

    });
    console.log(semester + ' ' + year);;
    services.getHomeDetails(user_id, semester, year)
        .then((result) => {
            // console.log(result);
            res.status(200).send({ "status": 200, "error": null, "response": result });
        }
        )
        .catch((error) => {
            res.status(401).send({ "status": 401, "error": error, "response": null });
        }
        );
}

const registerCourse = async (req, res) => {
    console.log('register course');
    const course_id = req.body.course_id;
    const user_id = req.session.user;
    const sec_id = req.body.sec_id;
    var semester = '';
    var year = '';
    var role = req.session.role;
    console.log(role)
    if (role == 'instructor') {
        res.status(401).send({ "status": 401, "error": "Instructor cannot register for course", "response": 'Prerequisite' });
    }
    else {

        await DateController.DateTime().then((data) => {
            semester = data.semester;
            year = data.year;

        });
        console.log(semester + ' ' + year);
        services.registerCourse(course_id, user_id, sec_id, semester, year)
            .then((data) => {
                console.log(data);
                res.status(200).send({ "status": 200, "error": null, "response": data });
            }
            )
            .catch((error) => {
                res.status(401).send({ "status": 401, "error": error, "response": null });
            }
            );
    }

}

const getAllDepartments = async (req, res) => {
    services.getAllDepartments()
        .then((data) => {
            // console.log(data);
            res.status(200).send({ "status": 200, "error": null, "response": data });
        }
        )
        .catch((error) => {
            res.status(401).send({ "status": 401, "error": error, "response": null });
        }
        );
}

const getDepartmentDetails = async (req, res) => {
    const dept_name = req.params.dept_name;
    services.getDepartmentDetails(dept_name)
        .then((data) => {
            // console.log(data);
            res.status(200).send({ "status": 200, "error": null, "response": data });
        }
        )
        .catch((error) => {
            res.status(401).send({ "status": 401, "error": error, "response": null });
        }
        );
}


module.exports = {
    getHomeDetails,
    registerCourse,
    getAllDepartments,
    getDepartmentDetails

}

