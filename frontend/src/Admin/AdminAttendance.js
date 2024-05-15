import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap-icons/font/bootstrap-icons.css";

function Admin() {
  const location = useLocation();

  return (
    <div className='container-fluid'>
      <div className='row flex-nowrap'>
        <div className='col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark'>
          <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100'>
            <Link to="/admin" className='d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none'>
              <span className='fs-5 d-none d-sm-inline'>Admin</span>
            </Link>
            <ul className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start' id='menu'>
              <li className={`nav-item w-100 ${location.pathname === '/Admin/AdminDashboard' ? 'bg-dark' : ''}`}>
                <Link to="/Admin/AdminDashboard" className='nav-link px-0 align-middle text-white'>
                  <i className='bi bi-house-door fs-4 me-1'></i> Dashboard
                </Link>
              </li>
              <li className={`nav-item w-100 ${location.pathname === '/Admin/AdminAttendance' ? 'bg-dark' : ''}`}>
                <Link to="/Admin/AdminAttendance" className='nav-link px-0 align-middle '>
                  <i className="bi bi-calendar fs-4 me-1"></i> Attendance
                </Link>
              </li>
              <li className={`nav-item w-100 ${location.pathname === '/admin/dashboard3' ? 'bg-dark' : ''}`}>
                <Link to="/admin/dashboard3" className='nav-link px-0 align-middle text-white'>
                  <i className="bi bi-person fs-4 me-1"></i> Employee
                </Link>
              </li>
              <li className={`nav-item w-100 ${location.pathname === '/admin/dashboard4' ? 'bg-dark' : ''}`}>
                <Link to="/admin/dashboard4" className='nav-link px-0 align-middle text-white'>
                  <i className="bi bi-bookmark fs-4 me-1"></i> Leave
                </Link>
              </li>
              <li className={`nav-item w-100 ${location.pathname === '/admin/dashboard5' ? 'bg-dark' : ''}`}>
                <Link to="/admin/dashboard5" className='nav-link px-0 align-middle text-white'>
                  <i className="bi bi-cash fs-4 me-1"></i> Payroll
                </Link>
              </li>
              <li className={`nav-item w-100 ${location.pathname === '/admin/dashboard6' ? 'bg-dark' : ''}`}>
                <Link to="/admin/dashboard6" className='nav-link px-0 align-middle text-white'>
                  <i className="bi bi-bar-chart fs-4 me-1"></i> Report
                </Link>
              </li>
              <li className={`nav-item w-100 ${location.pathname === '/login' ? 'bg-dark' : ''}`}>
                <Link to="/login" className='nav-link px-0 align-middle text-white'>
                  <i className="bi bi-box-arrow-left fs-4 me-1"></i> Logout
                </Link>
              </li>
              
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
