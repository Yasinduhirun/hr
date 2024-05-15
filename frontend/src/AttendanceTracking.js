import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function AttendanceTracking() {
  const [empId, setEmpId] = useState('');
  const [message, setMessage] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    setEmpId(e.target.value);
  };

  const captureAttendance = async () => {
    try {
      // Get the current date and time
      const dateTime = new Date();
      // Determine DateType based on dateTime (assuming logic is implemented on the server)
      const dateType = determineDateType(dateTime);
      // Determine AttendanceStatus based on time
      const attendanceStatus = determineAttendanceStatus(dateTime);

      // Send a request to the server to capture attendance
      const response = await axios.post('http://localhost:8081/captureAttendance', {
        empId: empId,
        dateTime: dateTime.toISOString(),
        dateType: dateType,
        attendanceStatus: attendanceStatus
      });

      // Handle success response
      setMessage(response.data.message);
    } catch (error) {
      // Handle error
      console.error('Error capturing attendance:', error);
      setMessage('Failed to capture attendance. Please try again.');
    }
  };

  // Helper function to determine DateType based on dateTime
  const determineDateType = (dateTime) => {
    // Logic to determine DateType based on dateTime
    // Example: Public, Bank, Mercantile, Full Moon Poya Holidays, or normal day
    return "Normal"; // Placeholder, replace with your logic
  };

  // Helper function to determine AttendanceStatus based on time
  const determineAttendanceStatus = (dateTime) => {
    // Logic to determine AttendanceStatus based on time
    // Example: Late if time is after 8:00 AM
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    if (hours > 8 || (hours === 8 && minutes > 0)) {
      return "Late";
    }
    return "On Time";
  };

  return (
    <div className="container">
      <h2>Attendance Tracking</h2>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <p>{currentDateTime.toLocaleString()}</p>
      </div>
      <Form>
        <Form.Group controlId="empId">
          <Form.Label>Employee ID</Form.Label>
          <Form.Control type="text" placeholder="Enter Employee ID" value={empId} onChange={handleInputChange} />
        </Form.Group>
        <Button variant="primary" onClick={captureAttendance}>
          Capture Attendance
        </Button>
      </Form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AttendanceTracking;
