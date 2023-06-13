const express = require('express');
const sessions = require("express-session");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
const oneDay = 1000 * 60 * 60 * 24;

app.use(
    sessions({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: oneDay },
    })
);

// const path = require('path');
const LoginController = require('./Controllers/Login.controller');
const InstructorController = require('./Controllers/Instructor.controller');
const HomeController = require('./Controllers/Home.controller');
const CourseController = require('./Controllers/Course.controller');
const { checkToken } = require('./Controllers/validationCheck');

app.get('/', (req, res) => {
    res.send('Hello World');
});

//add new user
app.post('/login', LoginController.getLoginInfo);
app.post('/instructor/:instructor_id', checkToken, InstructorController.getInstructorDetails);
app.post('/course/running', checkToken, CourseController.getRunningCoursesDept);
app.post('/course/running/:dept_id', checkToken, CourseController.getRunningCourseDeptWise);
app.post('/course/:course_id', checkToken, CourseController.getCourseDetails);
app.post('/home', checkToken, HomeController.getHomeDetails);
app.post('/drop_course', checkToken, CourseController.dropCourse);
app.post('/course_list', checkToken, CourseController.getRunningCourse);
app.post('/register', checkToken, HomeController.registerCourse);
app.post('/instructor', checkToken, InstructorController.getAllInstructors);
app.post('/logout', checkToken, LoginController.logout);
app.get('/course', CourseController.getAllCourses);
app.get('/dept', HomeController.getAllDepartments);
app.get('/dept/:dept_name', HomeController.getDepartmentDetails);

app.listen(8080, () => {
    console.log("Server running successfully on 8080");
});