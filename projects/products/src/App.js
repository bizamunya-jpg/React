import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Header() {
  return (
    <div>
      <h1>WELCOME TO THE STORE</h1>
      </div>
  );
}

function Products(){
  const [quantity, setQuantity] = useState(0)
  function handleClick(){
    setQuantity(quantity + 1);
  }
  return(
    <div>
      <p>Product: Juice</p>
      <p>brand: Mazoe</p>
      <p>Quantity: {quantity}</p>
      <button onClick={handleClick}>quantity</button>
    </div>  )
}

function App() {
  return (
    <div>
      <Header />
      <Products/>
    </div>
  );
}

export default App;