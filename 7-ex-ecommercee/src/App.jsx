import { useState } from "react";
import "./App.css";
import SignUpForm from "./Components/SignUpForm";

// 5. Membuat latihan dengan file terpisah untuk komponen
function App() {
  return (
    <div>
      <SignUpForm />
    </div>
  );
}
// Component = Function that returns JSX

export default App;

// Component
// function Greeting(props) {
//   return (
//     <>
//       <h1>{props.title}</h1>
//       <h2>Welcome to the world of React</h2>
//     </>
//   );
// }

// function Breakdown({ name, age }) {
//   return (
//     <>
//       <h4>
//         My name is {name} and I am {age} years old
//       </h4>
//     </>
//   );
// }
// Learning React - 6. Component, Props, dan State

// 1. Proses pembentukan komponen utama
// function App() {
//   const title = "Learning React";
//   return (
//     <>
//       <Greeting title={title} />
//       <div className="breakdown">
//         <Breakdown name={"Temola"} age={25} />
//       </div>
//       <div className="breakdown">
//         <Breakdown name={"Panjul"} age={26} />
//       </div>
//       <div className="breakdown">
//         <Breakdown name={"Roberto"} age={26} />
//       </div>
//       <div className="breakdown">
//         <Breakdown name={"Santoso"} age={26} />
//       </div>
//     </>
//   );
// }

// 2. Proses penampilan bersyarat
// function App() {
// const title = "Learning React";
// const showBreakdown = false; // Ubah nilai showBreakdown menjadi true untuk menampilkan komponen Breakdown

// const [showBreakdown, setShowBreakdown] = useState(false);
// function toggleGreeting() {
// Ubah nilai showBreakdown menjadi true untuk menampilkan komponen Breakdown
// Cara 1
// if (showBreakdown) {
//   setShowBreakdown(false);
// } else {
//   setShowBreakdown(true);
// }

// Cara 2
// setShowBreakdown(!showBreakdown);
// }
// return (
// <>
{
  /* <Greeting title={title} /> */
}
{
  /*  Penampilan bersyarat untuk komponen Breakdown */
}
// <div>
//         <button onClick={toggleGreeting}>Toggle Greeting</button>
//         {showBreakdown && (
//           <div className="breakdown">
//             <Breakdown name={"Temola"} age={25} />
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// 3. Proses input data dengan state
// function App() {
//   const [name, setName] = useState("");
//   const [age, setAge] = useState(0);

//   function handleNameChange(event) {
//     const value = event.target.value;
//     setName(value);
//   }

//   function handleAgeChange(event) {
//     const valueNumber = event.target.value;
//     setAge(Number(valueNumber));
//   }

//   return (
//     <>
//       <h1>Hello, {name}!</h1>
//       <input
//         type="text"
//         placeholder="Enter your name"
//         value={name}
//         onChange={handleNameChange}
//       />

//       <input
//         type="number"
//         placeholder="Enter your age"
//         onChange={handleAgeChange}
//       />
//       <h2>You are {age} years old.</h2>
//     </>
//   );
// }

// 4. Proses penampilan todoList atau tombol dan daftar di react
// function TodoList() {
//   const todos = [
//     { id: 1, text: "Learn React" },
//     { id: 2, text: "Build a React App" },
//     { id: 3, text: "Master React" },
//   ];

//   return (
//     <div>
//       <h2>My React Todos Learning</h2>
//       {/* <ul> */}
//       {/* <li>Lear React</li>
//         <li>Build a React App</li>
//         <li>Master React</li> */}
//       {/* {todos.map((todo) => (
//           <li key={todo.id}>{todo.text}</li>
//         ))} */}
//       {/* </ul> */}
//       <table className="table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Text</th>
//           </tr>
//         </thead>
//         <tbody>
//           {todos.map((todo) => (
//             <tr key={todo.id}>
//               <td>{todo.id}</td>
//               <td>{todo.text}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// function App() {
//   return (
//     <div className="App">
//       <TodoList />
//     </div>
//   );
// }
