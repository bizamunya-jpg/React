# What is a State?
- State is information that can change while your application is running
- think about a student application 
- A student's name might stay the same, but things like:
1. thier grade 
2. whether they're present.
3. whether a form is open.
4. a counter.
5. whether something is visible.
can change.

# Props vs State
- Props -> information given to a component.
- States -> information that a component keeps trcks of and can change. 

# React useState()

- State is information that can change, and count is the name we gave to that piece of state.

# React setCount()
- count = the current value.
- setCount = how we change tthat value.
- So if count is currently 0, we can do :
setCount(1)
for a counter,we'd usually want to increase it based on its current value:
setCount(count + 1);
so if :
count = 0 
then :
count + 1 =1
then we click agian :
count = 1 
count + 1 = 2