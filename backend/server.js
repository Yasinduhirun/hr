const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "payroll",
});
app.post('/addEmployee', (req, res) => {
    const { employeeId, employeeName, employeePassword, employeePhone, bankacc, memberSince, basicsal, role, otrate } = req.body;
    const sql = "INSERT INTO employee (empid, name, password, phone, bankacc, membersince, basicsal, role, otrate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [employeeId, employeeName, employeePassword, employeePhone, bankacc, memberSince, basicsal, role, otrate];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error adding employee:", err);
            return res.status(500).json({ error: "Error adding employee" });
        }
        console.log("Employee added successfully");
        return res.status(200).json({ message: "Employee added successfully" });
    });
});

// // app.post('/signup', (req, res) => {
// //     const sql = "INSERT INTO  (name, username, password) VALUES (?)";
// //     const values = [req.body.name, req.body.username, req.body.password];
// //     db.query(sql, [values], (err, data) => {
// //         if (err) {
// //             return res.json("Error");
// //         }
// //         return res.json(data);
//     });
// });
app.get('/employees', (req, res) => {
    const sql = "SELECT * FROM employee";
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error fetching employees:", err);
            return res.status(500).json({ error: "Error fetching employees" });
        }
        return res.status(200).json(data);
    });
});

app.delete('/deleteEmployee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM employee WHERE empid = ?";
    db.query(sql, id, (err, result) => {
        if (err) {
            console.error("Error deleting employee:", err);
            return res.status(500).json({ error: "Error deleting employee" });
        }
        console.log("Employee deleted successfully");
        return res.status(200).json({ message: "Employee deleted successfully" });
    });
});

app.put('/updateEmployee/:id', (req, res) => {
    const id = req.params.id;
    const { employeeName, employeePhone, bankacc, memberSince, basicsal, role, otrate } = req.body;
    const sql = "UPDATE employee SET name = ?, phone = ?, bankacc = ?, membersince = ?, basicsal = ?, role = ?, otrate = ? WHERE empid = ?";
    const values = [employeeName, employeePhone, bankacc, memberSince, basicsal, role, otrate, id];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error updating employee:", err);
            return res.status(500).json({ error: "Error updating employee" });
        }
        console.log("Employee updated successfully");
        return res.status(200).json({ message: "Employee updated successfully" });
    });
});





app.post('/login', (req, res) => {
    const sql = "SELECT * FROM employee WHERE empid = ? AND password = ?";
    
    db.query(sql, [req.body.empid, req.body.password], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        if (data.length > 0) {
            const user = data[0];
            return res.json({ status: 'success', role: user.role, empid: user.empid });
        } else {
            return res.json('failed');
        }
    });
});

app.post('/captureAttendance', (req, res) => {
    const { empId, dateTime, dateType, attendanceStatus } = req.body;
    const sql = "INSERT INTO attendance (empid, InTime, Date, DateType, AttendanceStatus) VALUES (?, ?, ?, ?, ?)";
    const values = [empId, dateTime, dateTime, dateType, attendanceStatus];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error capturing attendance:", err);
            return res.status(500).json({ error: "Error capturing attendance" });
        }
        console.log("Attendance captured successfully");
        return res.status(200).json({ message: "Attendance captured successfully" });
    });
});

app.listen(8081, () => {
    console.log("Backend server is running");
});
