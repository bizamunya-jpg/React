# What is an event?
- An event is simply something that happens within an application
- for example :
1. you click a button
2. You type into a box.
3. etc

- react needs a way to respond when these things happen 
suppose we have 
<button>Click here</button>
- the button is there, but nothing happpens when we click it
- we can tell react : "When this button is clicke ,run this function
-  hence we use onClick:
<button onClick={handlerClick}>click here</button>