// React Componets 
// function -this creates a function hence recomponents are also functions
// All component names normally start with capital letter.
function Welcome() {
    // the return this componet is bascically saying when you use me, display this
    return (<div>
        <h1>Hello John</h1>
        <p>Welcome to React.</p>
    </div>
    );
}

function Student() {
    return (
        <div>
            <h2>John</h2>
            <p>Computer Engineering</p>
        </div>
    );
}
// jsx looks like html but there are differences
<div className="student"></div>

//Using a Component
// creating a component doesn't automatically display it
// COMPONENTS INSIDE COMPONENTS
//LETS CREATE A SIMPLE STUDENT APPLICATION 
function Header() {
    return <h1>Student Management System</h1>;
}
function Student(props) {
    return <p>Student: John</p>;
}
function App() {
    return (<div>
        <Header />
        <Student />
    </div>
    );
}

export default App;