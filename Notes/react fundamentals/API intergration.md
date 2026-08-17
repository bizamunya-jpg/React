# API Intergration

- this is one of the most useful things you cvsan do with use effect.
- A common patten is :

```JavaScript
useEffect(() =>{
    fetch("http://example.com/data")
    .then((response) => response.json())
    .then((data) => {
        //use the data
    });
}, []);
```

- The flow is:
- Component loads -> useEffect runs -> fetch() gets data ->response becomes JavaScript data -> state can store it -> React displays it.
 complete flow:

 ```JavaScript
 function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);

  return (
    <div>
      <h2>Posts</h2>
    {posts.map((post) => (
     <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
    </div>
  ))}

    </div>
  );
}
```
