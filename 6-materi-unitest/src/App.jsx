import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* data-test-id untuk penghubung proses percobaan test h1 */}
      <h1 data-testid="web__title">Roberto Santoso</h1>
      <div className="card">
        <p>1+ Like Button</p>
        <button
          data-testid="button__counter"
          onClick={() => setCount((count) => count + 1)}
        >
          {count}
        </button>

        {/* Pengurangan */}
        <button
          data-testid="button__decrement"
          onClick={() => setCount((count) => count - 1)}
        >
          -
        </button>
      </div>
    </>
  );
}

export default App;
