import logo from './logo.svg';
import './App.css';

function Header() { return (
  <div>
    <h2>Student Management System</h2>
  </div>
  );
}
function Student(props) {
  return (
    <div>
      <p>Student: {props.name}</p>
      <p>Course: Computer Engineering </p>
    </div>
  );
}
function App(){
  return (
    <div>
      <Header />
      <Student name="John" />
      <Student name="Mary" />
    </div>
  )
}

    export default App;