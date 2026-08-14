import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function Greeting(){

  const [name, setName] = useState("")

useEffect(() => {
  console.log("Name changed!");
}, [name]);

const [message, setMessage] = useState("")

useEffect(() => {
  if(name === ""){
    setMessage("");
  }else{
    setMessage(`Welcome, ${name}!`);
  }
},[name]);

return (
  <div>
    <input 
    placeholder="Enter your name"
    value={name}
    onChange={(event) => setName(event.target.value)}
    />
    <p>Hello {name}</p>
    <p>{message}</p>
  </div>
)
}

function App() {
    return ( 
    <Greeting />
    );
}

export default App;