import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Header() {
  return (
    <div>
      <h1>Guess a number</h1>
    </div>
  );
}

function GuessGame() {
  const [guess, setGuess] = useState("");

  const [result, setResult] = useState("");
  function handleClick() {
    if (guess === 96) {
      setResult("correct guess");
    } else if (guess > 96) {
      setResult("number lower than that");
    } else  {
      setResult("number higher than that");
    }
  }

  return (
    <div>
      <input placeholder="ENTER A NUMBER"
        onChange={(event) => setGuess(Number(event.target.value))}></input>
      <p>your guess:{guess}</p>
      <button onClick={handleClick}>Check</button>
     <p>{result}</p>
    </div>
  );
}
function App() {
  return (<div>
    <Header />
    <GuessGame />
  </div>
  );
}

export default App;