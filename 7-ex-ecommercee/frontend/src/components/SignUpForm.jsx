import { useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

export default function SignUpForm() {
  // MANUAL
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // WITH REACT-HOOK-FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    console.log(data);
    alert(
      `Account created!, with username: ${data.username},  email: ${data.email} and password: ${data.password}`,
    );
  }
  ProductCard.propTypes = {
    product: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired,
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto" }}>
      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            Username
            <input
              type="text"
              placeholder="Username"
              {...register("username", {
                required: "Username is required",
              })}
            />
          </label>
          {errors.username && (
            <p style={{ color: "crimson" }}>{errors.username.message}</p>
          )}
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>
            Email
            <input
              type="email"
              placeholder="you@exaple.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
            />
          </label>
          {errors.email && (
            <p style={{ color: "crimson" }}>{errors.email.message}</p>
          )}
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>
            Password
            <input
              type="password"
              placeholder="******"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,12}$/,
                  message:
                    "Password must contain at least one letter and one number",
                },
                minLength: {
                  value: 4,
                  message: "Password must be at least 4 characters",
                },
                // maxLength: {
                //   value: 30,
                //   message: "Password must be less than 12 characters",
                // },
              })}
            />
          </label>
          {errors.password && (
            <p style={{ color: "crimson" }}>{errors.password.message}</p>
          )}
        </div>

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}
