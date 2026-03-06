import { useState } from "react";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    // alert(
    //   "Account created!, wtih email: " + email + " and password: " + password,
    // );
    alert(`Account created!, wtih email: ${email} and password: ${password}`);
  }

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto" }}>
      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            Email
            <input
              type="email"
              placeholder="you@exaple.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>
            Password
            <input
              type="password"
              placeholder="******"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </div>

        <button type="submit">Creat Account</button>
      </form>
    </div>
  );
}
