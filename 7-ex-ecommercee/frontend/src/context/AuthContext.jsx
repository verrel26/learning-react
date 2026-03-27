// SESUDAH API
import { createContext, useState, useContext, useEffect } from "react";
import {
  register as registerAPI,
  login as loginAPI,
  getMe,
} from "../services/api";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });
  const [loading, setLoading] = useState(true);

  // Load user dari token saat app start
  useEffect(() => {
    async function loadUser() {
      const savedToken = localStorage.getItem("token");

      if (savedToken) {
        try {
          const response = await getMe(savedToken);
          if (response.success) {
            setUser(response.data.user);
            setToken(savedToken);
          } else {
            // Token invalid, clear
            localStorage.removeItem("token");
            setToken(null);
            setUser(null);
          }
        } catch (error) {
          console.error("Failed to load user:", error);
          localStorage.removeItem("token");
          setToken(null);
          setUser(null);
        }
      }

      setLoading(false);
    }

    loadUser();
  }, []);

  async function signUp(email, password) {
    try {
      const response = await registerAPI(email, password);

      if (response.success) {
        const { user, token } = response.data;
        setUser(user);
        setToken(token);
        localStorage.setItem("token", token);
        return { success: true };
      } else {
        return { success: false, error: response.messsage };
      }
    } catch (error) {
      return { success: false, error: response.messsage };
    }
  }

  async function login(email, password) {
    try {
      const response = await loginAPI(email, password);

      if (response.success) {
        const { user, token } = response.data;
        setUser(user);
        setToken(token);
        localStorage.setItem("token", token);
        return { success: true };
      } else {
        return { success: false, error: response.messsage };
      }
    } catch (error) {
      return { success: false, error: response.messsage };
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  }
  return (
    <AuthContext.Provider
      value={{ signUp, user, logout, login, token, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
// ------------------------------------------------------------------------------------------
// SEBELUM API
// import { createContext, useState, useContext } from "react";

// const AuthContext = createContext(null);

// export default function AuthProvider({ children }) {
//   const [user, setUser] = useState(() => {
//     const savedEmail = localStorage.getItem("currentUserEmail");
//     return savedEmail ? { email: savedEmail } : null;
//   });

//   function signUp(email, password) {
//     const users = JSON.parse(localStorage.getItem("users") || "[]");

//     if (users.find((u) => u.email === email)) {
//       return { success: false, error: "Email already exists" };
//     }
//     const newUser = { email, password };
//     users.push(newUser);
//     localStorage.setItem("users", JSON.stringify(users));
//     localStorage.setItem("currentUserEmail", email);

//     setUser({ email });

//     return { success: true };
//   }

//   function login(email, password) {
//     const users = JSON.parse(localStorage.getItem("users") || "[]");
//     const user = users.find(
//       (u) => u.email === email && u.password === password,
//     );

//     if (!user) {
//       return { success: false, error: "Invalid email or password" };
//     }

//     localStorage.setItem("currentUserEmail", email);
//     setUser({ email });

//     return { success: true };
//   }

//   function logout() {
//     localStorage.removeItem("currentUserEmail");
//     setUser(null);
//   }
//   return (
//     <AuthContext.Provider value={{ signUp, user, logout, login }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);

//   return context;
// }
