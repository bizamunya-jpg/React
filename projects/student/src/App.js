import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Header() {
  return (
    <div>
      <h1>Student Management System</h1>
    </div>
  );
}

function Students(props) {
  const [marks, setMarks] = useState(0); 
  function handleClick(){
    setMarks(marks +1);
  }
  const students = [
    {name: "John", course: "Computer Engineering", grade: "A",},
    { name: "Mary", course: "Computer Science", grade: "B" },
    { name: "Peter", course: "Information Technology", grade: "A" },
  ];
  return (
    <div>
      {
      students.map((student) => (
    <div key={student.name}>
      <p>{student.name}</p>
      <p>{student.course}</p>
      <p>{student.grade}</p>
      <p> Grade: {getGrade(marks)}</p>
      <p>Marks: {marks}</p>
      {marks >= 50? <p>PASSED</p> : <p>FAILED</p>}
      <button onClick={handleClick}>Add Marks</button>
      
    </div>
    ))}
    </div>
)};

function StudentForm() {
  const [name,setName] = useState("");

  return(
    <div>
      <input
      value={name}
        onChange={(event) => setName(event.target.value)}
        />
        <p>Student name: {name}</p>
    </div>
  );

}
 function getGrade(marks) {
  if (marks >= 90){
    return "A+"
  }else if (marks >=85){
    return "A"
  }else if (marks >= 80){
    return "A-"
  }else if (marks >= 75) {
  return "B+"
} else if (marks >= 70) {
  return "B"
  } else if (marks >= 65) {
    return "B-"
  } else if (marks >= 60) {
    return "C+"
  } else if (marks >= 55) {
    return "C"
  } else if (marks >= 50) {
    return "C-"
  } else if (marks >= 40) {
    return "D"
  } else if (marks >= 30) {
    return "E"
  } else if (marks >= 20) {
    return "F-"
  } else {
    return "U"
  }
 }

function App() {
  return (
    <div><Header />
      <Students />
    </div>

  );
}

export default App;
