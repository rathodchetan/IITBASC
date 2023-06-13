const services = require('../Services/Course.services');
const DateController = require('./Date.controller');

const getRunningCoursesDept = async (req, res) => {
    // const year = '2008';
    // const semester = 'Spring';
    var semester = '';
    var year = '';
    await DateController.DateTime().then((data) => {
        semester = data.semester;
        year = data.year;

    });
    console.log(semester + ' ' + year);

    services.getRunningCoursesDept(semester, year)
        .then((data) => {
            // console.log(data);
            res.status(200).send({ "status": 200, "error": null, "response": data });
        }
        )
        .catch((error) => {
            res.status(401).send({ "status": 401, "error": error, "response": null });
        });

}

const getRunningCourseDeptWise = async (req, res) => {
    const dept = req.params.dept_id;
    // const year = '2008';
    // const semester = 'Spring';

    var semester = '';
    var year = '';
    await DateController.DateTime().then((data) => {
        semester = data.semester;
        year = data.year;

    });
    console.log(semester + ' ' + year);
    services.getRunningCourseDeptWise(dept, semester, year)

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

const getCourseDetails = (req, res) => {
    const course_id = req.params.course_id;
    services.getCourseDetails(course_id)
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

const dropCourse = async (req, res) => {
    const course_id = req.body.course_id;
    const user_id = req.session.user;
    // console.log("hello guys")
    // console.log(req.session)

    var semester = '';
    var year = '';
    await DateController.DateTime().then((data) => {
        semester = data.semester;
        year = data.year;

    });
    console.log(semester + ' ' + year);
    // const course_id = '991';
    // const user_id = '2765';
    // year = '2008';
    // semester = 'Spring';
    services.dropCourse(course_id, user_id, semester, year)
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

const getRunningCourse = async (req, res) => {
    // const user_id = '11'
    // const semester = 'Spring';
    // const year = '2008';

    var semester = '';
    var year = '';
    await DateController.DateTime().then((data) => {
        semester = data.semester;
        year = data.year;

    });
    console.log(semester + ' ' + year);

    services.getRunningCourse(semester, year)
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

const getSectionId = async (req, res) => {
    const course_id = req.body.course_id;
    // const user_id = req.user.id;
    // const year = '2008';
    // const semester = 'Spring';

    var semester = '';
    var year = '';
    await DateController.DateTime().then((data) => {
        semester = data.semester;
        year = data.year;

    });
    console.log(semester + ' ' + year);

    services.getSectionId(course_id, semester, year)
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

const getAllCourses = (req, res) => {
    services.getAllCourses()
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
    getRunningCoursesDept,
    getRunningCourseDeptWise,
    getCourseDetails,
    dropCourse,
    getRunningCourse,
    getSectionId,
    getAllCourses
}

