# What is A List
- A list in react means displaying multiple pieces of similar information
- for example instead of having one student:
- eg john
- we can have John, Peter, Mary , Sarah

# Step 1
- An array is just a container that holds multiple values:
- In React we can use JavaScript's .map() to go through the array and create something for each student:
{students.map((student) => (
    <p>{student}</p>
))}
hence react will display:
John
Mary
Peter
- Think of .map() as: go through the array one item ata a time and do something
   with each item. and react displays all three.

# Lists with OBJECTS
- Instead of : we can store more information about each student 