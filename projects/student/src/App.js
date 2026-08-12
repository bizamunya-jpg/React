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
  return (
    <div>
      <p>Student: {props.name}</p>
      <p>Course: Computer Engineering</p>
      <p>Marks: {marks}</p>
      {marks >= 5 ? <p>PASSED</p> : <p>FAILED</p>}
      <button onClick={handleClick}>Add Marks</button>
      
    </div>
   
  );
}

function App() {
  return (
    <div><Header />
      <Students name="John" />
    </div>

  );
}

export default App;
