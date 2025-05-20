import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/results')
      .then(res => setResults(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="App">
      <h1>Semester Results</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Student ID</th><th>Name</th><th>Branch</th><th>Class</th>
            <th>Semester</th><th>Year</th><th>CN</th><th>WT</th><th>OS</th><th>DBMS</th><th>Cloud</th>
          </tr>
        </thead>
        <tbody>
          {results.map((student, idx) => (
            <tr key={idx}>
              <td>{student.Student_id}</td>
              <td>{student.Name}</td>
              <td>{student.Branch}</td>
              <td>{student.Class}</td>
              <td>{student.Semester}</td>
              <td>{student.Academic_Year}</td>
              <td>{student.CN}</td>
              <td>{student.WT}</td>
              <td>{student.OS}</td>
              <td>{student.DBMS}</td>
              <td>{student.Cloud}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
