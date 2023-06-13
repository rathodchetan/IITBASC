const services = require('../Services/Instructor.services');
const DateController = require('./Date.controller');
const getInstructorDetails = async (req, res) => {
    const instructor_id = req.params.instructor_id;
    // console.log(instructor_id);
    var semester = '';
    var year = '';
    await DateController.DateTime().then((data) => {
        semester = data.semester;
        year = data.year;

    });
    console.log(semester + ' ' + year);
    services.getInstructorDetails(instructor_id, semester, year)
        .then((data) => {
            // console.log(data);
            res.status(200).send({ "status": 200, "error": null, "response": data });
        })
        .catch((error) => {
            res.status(401).send({ "status": 401, "error": error, "response": null });
        });
}

const getAllInstructors = (req, res) => {


    services.getAllInstructors()
        .then((data) => {
            res.status(200).send({ "status": 200, "error": null, "response": data });
        })
        .catch((error) => {
            res.status(401).send({ "status": 401, "error": error, "response": null });
        });
}



module.exports = {
    getInstructorDetails,
    getAllInstructors
}
