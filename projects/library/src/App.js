import './App.css';
import { useState } from 'react';

function GameLibrary() {

  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");

  function addGame(newGame) {
    const alreadyExists = games.some(
      (game) => game.name.toLowerCase() === newGame.name.toLowerCase()

    );

    if (alreadyExists) {
      alert("That game is already in the library");
      return;
    }
    setGames((currentGames) => [...currentGames, newGame]);
  }

  function deleteGame(gameName) {
    setGames((currentGames) =>
      currentGames.filter((game) => game.name !== gameName)
    );
  }

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Game Library</h1>
      <GameForm onAddGame={addGame} />
      <input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="search games"
      />
      {games.length === 0 ? (
        <p>No games added yet</p>
      ) : filteredGames.length === 0 ? (
        <p>No games match your search</p>
      ) : (
        filteredGames.map((game) => (
          <GameCard
            key={game.name}
            game={game}
            onDelete={deleteGame}
          />
        ))
      )}
    </div>
  )
}

function GameCard({ game, onDelete }) {
  return (
    <div>
      <h2>{game.name}</h2>
      <p>Genre: {game.genre}</p>
      <p>Rating: {game.rating}</p>
      <button onClick={() => onDelete(game.name)}>
        Delete
      </button>
    </div>
  );
}

function GameForm({ onAddGame }) {

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

    onAddGame(newGame);

    setName("");
    setGenre("");
    setRating("");

    console.log(newGame);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Game name"
        required
      />
      <input
        value={genre}
        onChange={(event) => setGenre(event.target.value)}
        placeholder="Genre"
        required
      />
      <input
        type="number"
        min="1"
        max="10"
        value={rating}
        onChange={(event) => setRating(event.target.value)}
        placeholder="Rating"
        required
      />
      <button type="submit">Add Game</button>
    </form>

  )
};


function App() {
  return (
    <div>
      <GameLibrary />
    </div>
  );
}

export default App;
