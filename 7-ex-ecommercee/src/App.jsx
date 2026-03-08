import { useState, useEffect } from "react";

export default function App() {
  // Mounting -> Updating -> Unmounting
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
        );
        const data = await response.json();
        setUsers(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div>
      {users.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}

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
/* <Greeting title={title} /> */ {
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

// 5. Membuat latihan dengan file terpisah untuk komponen
// function App() {
//   return (
//     <div>
//       <SignUpForm />
//     </div>
//   );
// }

// 6. Membuat latihan dengan file terpisah untuk komponen dan menggunakan react-router-dom
// function HomePage() {
//   return <h1>Home Page</h1>;
// }

// function AboutPage() {
//   return <h1>About Page</h1>;
// }

// function App() {
//   return (
//     <div>
//       <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
//         <Link to="/">Home</Link>
//         <Link to="/about">About</Link>
//         <Link to="/signup">Sign Up</Link>
//       </nav>

//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/about" element={<AboutPage />} />
//         <Route path="/signup" element={<SignUpForm />} />
//         <Route path="*" element={<h1>404 Not Found</h1>} />
//       </Routes>
//       <footer>
//         <p>&copy; 2026 My App. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }

// export default App;

// 7. Membuat latihan dengan file terpisah untuk komponen, menggunakan react-router-dom, dan menambahkan fitur state untuk mengelola data pengguna

// import { useContext, useState } from "react";
// import { Routes, Route, Link } from "react-router-dom";
// import { AuthContext } from "./AuthContext.js";
// import "./App.css";
// import SignUpForm from "./components/SignUpForm";

// function Navbar() {
//   const { user, logout } = useContext(AuthContext);
//   return (
//     <header
//       style={{
//         padding: "1rem 1.5rem",
//         marginBottom: "1rem",
//         borderBottom: "1px solid #e5e7eb",
//         display: "flex",
//         justifyContent: "space-between",
//       }}
//     >
//       <nav style={{ display: "flex", gap: "1rem" }}>
//         <Link to="/">Home</Link>
//         <Link to="/profile">Profile</Link>
//       </nav>

//       <div>
//         {!user.isAuth ? (
//           <Link to="/login">Login</Link>
//         ) : (
//           <button onClick={() => logout()}>Logout</button>
//         )}
//       </div>
//     </header>
//   );
// }

// function HomePage() {
//   const { user } = useContext(AuthContext);
//   return (
//     <div style={{ padding: "0 1.5rem" }}>
//       <h1>Home</h1>

//       {user.isAuth ? (
//         <p>Welcome back, {user.name}!</p>
//       ) : (
//         <p>Please log in to view your profile.</p>
//       )}
//     </div>
//   );
// }

// function ProfilePage() {
//   const { user } = useContext(AuthContext);
//   return (
//     <div style={{ padding: "0 1.5rem" }}>
//       <h1>Profile</h1>
//       <p>Name: {user.name}</p>
//       <p>Here you could show more user info from the context</p>
//     </div>
//   );
// }

// function LoginPage() {
//   const [name, setName] = useState("");
//   const { user, login } = useContext(AuthContext);

//   function handleSubmit(e) {
//     e.preventDefault();
//     if (!name.trim()) return;
//     login(name);
//   }

//   return (
//     <div style={{ padding: "0 1.5rem" }}>
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
//         <label>
//           Name
//           <input
//             type="text"
//             placeholder="Type any name..."
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             style={{ marginLeft: "0.5rem" }}
//           />
//         </label>
//         <button type="submit" style={{ marginLeft: "0.5rem" }}>
//           Login
//         </button>
//       </form>
//       {user.isAuth && <p>Welcome, {user.name}!</p>}
//     </div>
//   );
// }

// export default function App() {
//   const [user, setUser] = useState({ name: "", isAuth: false });

//   function login(name) {
//     setUser({ name: name, isAuth: true });
//   }

//   function logout(name) {
//     setUser({ name: "", isAuth: false });
//   }

//   return (
//     <div>
//       <AuthContext.Provider value={{ user, login, logout }}>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/profile" element={<ProfilePage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route
//             path="*"
//             element={<h1 style={{ padding: "0 1.5rem" }}>404 Not Found</h1>}
//           />
//         </Routes>
//       </AuthContext.Provider>

//       <footer style={{ padding: "1rem 1.5rem", marginTop: "2rem" }}>
//         <p>&copy; 2026 My App. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }

// 8. Menghitung untuk show counter
// import { useState, useEffect } from "react";

// export default function App() {
//   const [showCounter, setShowCounter] = useState(false);
//   // Mounting -> Updating -> Unmounting

//   return (
//     <div>
//       <button onClick={() => setShowCounter(!showCounter)}>
//         &nbsp;
//         {""} Show Counter
//       </button>
//       {showCounter && <Counter />}
//     </div>
//   );
// }

// function Counter() {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     console.log("Component Mounthed");

//     return () => {
//       console.log("Component Unmounted");
//     };
//   }, []);

//   useEffect(() => {
//     console.log("Component Updated");
//   }, [count]);

//   return <button onClick={() => setCount(count + 1)}>{count}</button>;
// }
