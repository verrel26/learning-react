import { useState } from "react";
import "./App.css";

function Greeting({ name, age }) {
  return (
    <div>
      <h1>
        Hello, My name is {name}, and I am {age} years old!
      </h1>
    </div>
  );
}

function App() {
  const name = "Panjul";
  const age = 20;
  const address = "Jl. Raya Bogor No. 123";

  return (
    <div className="App">
      <Greeting name={"Subihi"} age={27} />
      <Greeting name={"Roberto"} age={30} />
      <Greeting name={"Sofia"} age={25} />
      <Greeting name={"Santoso"} age={25} />
    </div>
  );
}

export default App;
