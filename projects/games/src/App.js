import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Header() {
  return(
    <div>
      <h1>RATING GAMES</h1>
    </div>
  )
}
function GameForm() {

  const [games, setGames] = useState([]);

  const [name, setName] = useState("");

  const [genre, setGenre] = useState("");

  const [rating, setRating] = useState("");


  function handleSubmit(event) {
    event.preventDefault();
    const newGame = {
      name: name,
      genre: genre,
      rating: rating
    };
    setGames([...games, newGame]);

    console.log(newGame);
    console.log(name, genre, rating);
  }



  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder='Enter Game Name'
      />
      <input
        value={genre}
        onChange={(event) => setGenre(event.target.value)}
        placeholder="ENTER GENRE"
      />
      <input
        value={rating}
        onChange={(event) => setRating(event.target.value)}
        placeholder="RATING?"
      />
      <p>Game: {name}</p>
      <p>Genre: {genre} </p>
      <p>Rating:{rating}</p>
      <button type="submit">Add Game</button>
      {games.map((game) => (
        <div key={game.name}>
        <p>{game.name}</p>
        <p>{game.genre}</p>
        <p>{game.rating}/10</p>
        </div>
      ))}
    </form>
  );
}

function App() {
  return (
    <div>
      <Header />
      <GameForm />
    </div>
  );
}

export default App;