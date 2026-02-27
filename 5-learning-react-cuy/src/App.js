import "./App.css";
import Introduction from "./components/introduction";
import Profile from "./components/profile";

// ini adalah fungsioanl component, karena dia hanya sebuah fungsi yang mengembalikan JSX
function App() {
  return (
    <div className="App-header">
      <h1>Hello, React!</h1>
      <p>This is a simple React app.</p>
      <Profile />
      <Introduction name="John" />
      <Introduction name="Panjul" />
    </div>
  );
}

export default App;
