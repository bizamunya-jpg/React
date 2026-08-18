# Component Communication
this is the topic we specifically wanted to make sure we cover properly.

# Parent -> Child

we already know this
``` JavaScript
function Player(props) {
    return <p>{props.name}</p>;
}
function App() {
    return <Player name="Alex" />
}
```
- the parent sends information down through props.
- but now comes the other direction:
 # Child -> Parent
 - A child can't directly change the parent's state.
 - instead, the parent gives the child a function through props.
-
 for example:
 ```JavaScript
 function App (){
    const [message, setMessage] = useState("");

    function handleMessage(text). {
        setMessage(text);
    }
    return(
        <div>
        <child onSend={handleMessage} /> 
        <p>{message}</p>
        </div>
    )
 }
 ```
 - then the child receives that function as a prop:
 ``` JavaScript
 function Child(props) {
    return(
        <button onClick={()=> props.onSend("Hello from Child!")}>
        </button>
    );
 }
 ```
- Hence the  flow is :

# Parent State => Props => Child => Callback => Parent State Update
- The parent owns the state.
- the child can receive the state through props.
- The child cannot directly change the prop.
- if the parent passes a function like setCount, the child can request a state change by calling that function.
