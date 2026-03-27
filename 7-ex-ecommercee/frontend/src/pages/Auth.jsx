import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  // Logic
  const [mode, setMode] = useState("signup");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const { signUp, login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // onSubmit with API
  async function onSubmit(data) {
    setError(null);

    try {
      let result;
      if (mode === "signup") {
        result = await signUp(data.email, data.password);
      } else {
        result = await login(data.email, data.password);
      }

      if (result.success) {
        // Navigate to home atau profile (kembalikan atau langsung masuk ke halaman home atau profile)
        navigate("/");
      } else {
        setError(result.error || "Authentication failed !");
      }
    } catch (error) {
      setError("An error occured. Please try again.");
      console.error(error);
    }
  }
  // function onSubmit(data) {
  //   // alert("Sign Up guys");
  //   setError(null);
  //   let result;
  //   if (mode === "signup") {
  //     result = signUp(data.email, data.password);
  //   } else {
  //     result = login(data.email, data.password);
  //   }

  //   if (result.success) {
  //     navigate("/");
  //     alert("huraa!");
  //     // Link ke halaman lain
  //   } else {
  //     setError(result.error);
  //   }
  // }

  return (
    // UI
    <div className="page">
      <div className="container">
        <div className="auth-container">
          <h1 className="page-title">
            {mode === "signup" ? "Sign Up" : "Login"}
          </h1>
          <form className="auth-group" onSubmit={handleSubmit(onSubmit)}>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="form-input"
                type="email"
                id="email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <span className="form-errors">{errors.email.message}</span>
              )}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  maxLength: {
                    value: 12,
                    message: "Password must be less than 12 characters",
                  },
                })}
                className="form-input"
                type="password"
                id="password"
              />
              {errors.password && <span>{errors.password.message}</span>}
            </div>
            <button type="submit" className="btn btn-primary btn-large">
              {mode === "signup" ? "Sign Up" : "Login"}
            </button>
          </form>

          <div className="auth-switch">
            {mode === "signup" ? (
              <p>
                Already have an account?{" "}
                <span className="auth-link" onClick={() => setMode("login")}>
                  Login
                </span>
              </p>
            ) : (
              <p>
                {" "}
                Don't have an account?{" "}
                <span className="auth-link" onClick={() => setMode("signup")}>
                  Sign Up
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
