# What is a form
- A form is simply a way for the user to enter information

# Create the State
- Inside a component, we need to remember what the user types:
```JavaScript
const [name, setName] = useState("");
<input 
value={name}
onChange={(event) => setName(event.target.value)} 
/>
```

## key points
- value={name} -> React controls the input.
- onChange={...} -> updates React state when the user types.

# Submit the form
``` JavaScript
<form onSubmit={handleSubmit}>
```
## key points
- onSubmit={...} -> handles the form submission
- the function handles what happens when the form is submitted.
hence we will have.
```JavaScript 
function handleSubmit(event) {
    event.preventDefault();
}
```