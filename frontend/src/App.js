import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Admin from './Admin/AdminDashboard';
import HrDashboard from './Hr/HrDashboard';
import HrAttendance from './Hr/HrAttendance';
import HrEmployee from './Hr/HrEmployee';
import HrLeave from './Hr/HrLeave';
import HrPayroll from './Hr/HrPayroll';
import HrReport from './Hr/HrReport';
import Employee from './Employee/EmployeeDashboard'; 
import AdminAttendance from './Admin/AdminAttendance';
import AdminDashboard from './Admin/AdminDashboard';
import AttendanceTracking from './AttendanceTracking';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path='/Admin' element={<Admin />} />
        
        <Route path='/Employee' element={<Employee />} /> {/* Add this route */}
        <Route path='/Admin/AdminAttendance' element={<AdminAttendance />} />
        <Route path='/Admin/AdminDashboard' element={<AdminDashboard />} />
        <Route path='/Hr/HrDashboard' element={<HrDashboard />} />
        <Route path='/Hr/HrAttendance' element={<HrAttendance />} />
        <Route path='/Hr/HrEmployee' element={<HrEmployee />} />
        <Route path='/Hr/HrLeave' element={<HrLeave />} />
        <Route path='/Hr/HrPayroll' element={<HrPayroll />} />
        <Route path='/Hr/HrReport' element={<HrReport />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/AttendanceTracking' element={<AttendanceTracking />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
