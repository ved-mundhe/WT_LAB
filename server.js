const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // default for XAMPP
    database: 'student_results'
});

app.get('/results', (req, res) => {
    const sql = `
    SELECT 
        s.Student_id, s.Name, s.Branch, s.Class, s.Semester, s.Academic_Year,
        ROUND(m.CN * 0.3 + e.CN * 0.7, 2) AS CN,
        ROUND(m.WT * 0.3 + e.WT * 0.7, 2) AS WT,
        ROUND(m.OS * 0.3 + e.OS * 0.7, 2) AS OS,
        ROUND(m.DBMS * 0.3 + e.DBMS * 0.7, 2) AS DBMS,
        ROUND(m.Cloud * 0.3 + e.Cloud * 0.7, 2) AS Cloud
    FROM Student s
    JOIN MSE m ON s.Student_id = m.Student_id
    JOIN ESE e ON s.Student_id = e.Student_id
    `;

    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
});

app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});
