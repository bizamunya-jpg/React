# What Are Props
- Props are information that we give to React componet 
- think of a component like a person.
- If I say: 
"Student, your name is John."
i am giving the student component some information.
So you can think:
Props = information passed from one component to another 

# why do we need Props?
- remember our orginal component:

- function student () {
    return 
<p>student: john </p>
}

- There's a problem.
- this component is stucj displaying John.
- What if we want Mary?
- we could create another component, but that would be wasteful
- Instead we make the component reusable:
- Now we have one student component, but we can give it different information
- Props allow us to reuse components with different information
- one important rule is that props are passed into a component
- one important new thing here is the { } around props.name
- those curly braces mean:
     " React, I want to put JavaScript here."