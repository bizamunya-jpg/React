import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading State
  const [error, setError] = useState("");

  // fetching URL
  useEffect(() => {
    fetchPosts();
  }, []);

  function fetchPosts() {
    setLoading(true);
    setError("");

    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) =>{
        if(!response.ok){
          throw new Error("Failed to fetch posts");
        }
       return response.json();
      })

      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load posts");
        setLoading(false);
      })
  }
  if (loading) {
    return <p>loading posts...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div>
      <h1>Posts App</h1>

      <button onClick={fetchPosts} disabled={loading}>
        {loading ? "loading..." : "Refresh Posts"}
        </button>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}
function App() {
  return (
    <div>
      <Posts />
    </div>
  );
}

export default App;
