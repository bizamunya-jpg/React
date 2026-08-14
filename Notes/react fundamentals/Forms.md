# What is a form
- A form is simply a way for the user to enter information

# Create the State
-Inside a component, we need to remember what the user types:
const [name, setName] = useState("");
<input 
value={name}
onChange={(event) => setName(event.target.value)} 
/>

# Submit the form
<form onSubmit={handleSubmit}>
-the function handles what happens when the form is submitted.
hence we will have 
function handleSubmit(event) {
    event.preventDefault();
}