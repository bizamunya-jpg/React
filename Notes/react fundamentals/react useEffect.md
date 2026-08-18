# React: useEffect 
- useEffect lets a component do something when certain values change or when the component first appers
- hence use effect runs code because something happened during rendering, usually after the component renders
- for example ,imagine our Game Library needs to save or load information 
first we import it 
```JavaScript
import { useState, useEffect }from "react";
- then
useEffect(()=> {
    console.log("Game Library loaded!");
}, []);
- the important part is the [].
```
# WHAT DOES [] MEAN?
- It means:
           Run this effect when the component first appears.

so if we have 
```JavaScript
function App() {
    useEffect(() =>{
        console.log("Hello!")
    },[]);

    return <h1>Game Library</h1>;
}
```

# But There's another important version

```JavaScript
useEffect(() => {
    console.log("Name change!")
    }, [name]);
```

- now react watches name.
- whenever name changes, the effect runs
    
# Now let's learn cleanup
- This an important part of useEffect. 
- Suppose we create a timer:
``` JavaScript
useEffect(() => {
    // START THE TIMER
    const timer = setInterval(() => {
        console.log("Tick");
    }, 1000);
    return () => {
        // CLEAN UP THE TIMER WHEN THE EFFECT NEEDS TO BE CLEANED UP.
        clearInterval(timer)
    };
}, []);

```
- This prevents things like timers and subscriptions continuing when they're no longer needed

# useState
- stores data that can change

- mental model of useEffect:
# Render => Effect Runs => Fetch Data => State Update => React Re-renders
