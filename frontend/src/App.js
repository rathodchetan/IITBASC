import React from 'react';
import { BrowserRouter, Routes, Route, Redirect } from 'react-router-dom';
import Login from './Components/Login';
import Instructor from './Components/Instructor';
import RunningDept from './Components/RunningDept';
import DeptRunCourse from './Components/DeptRunCourse';
import RunningCourse from './Components/RunningCourse';
import Home from './Components/Home';
import Register from './Components/Register';
import AllInstructor from './Components/AllInstructors';
import AllCourses from './Components/AllCourses';
import Default from './Components/Default';

function App() {

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Default />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/instructor/:instructor_id" element={<Instructor />} />
        <Route path="/course/running" element={<RunningDept />} />
        <Route path="/course/running/:dept_name" element={<DeptRunCourse />} />
        <Route path="/course/:course_id" element={<RunningCourse />} />
        <Route path="/home/register" element={<Register />} />
        <Route path="/instructor" element={<AllInstructor />} />
        <Route path="/course" element={<AllCourses />} />

      </Routes>
    </BrowserRouter>

  );
}

export default App;
