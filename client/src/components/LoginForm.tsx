import styles from "../styles/Login.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  selectIsShowLogin,
  hideLogin,
  setUser,
  logout,
} from "../store/signinSlice";
import { useRegisterMutation, useLoginMutation } from "../store/authApi";
import { useState } from "react";
import { motion } from "framer-motion";

const LoginForm = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsgs, setErrorMsgs] = useState<string>("");
  const dispatch = useDispatch();

  const isShowLogin = useSelector(selectIsShowLogin);
  const currentUser = useSelector(
    (state: { signin: { user: { name: string; email: string } } }) =>
      state.signin.user
  );

  const [registerUser, { isLoading: isRegistering, error: registerError }] =
    useRegisterMutation();
  const [loginUser, { isLoading: isLoggingIn, error: loginError }] =
    useLoginMutation();

  const onClose = () => {
    dispatch(hideLogin());
    setIsFlipped(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setConfirmPassword("");
  };
  // const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     const response = await loginUser({ email, password }).unwrap();
  //     localStorage.setItem("token", response.token);
  //     dispatch(
  //       setUser({
  //         name: response.user.name,
  //         email: response.user.email,
  //         _id: response.user._id,
  //       })
  //     );
  //     onClose();
  //   } catch (err) {
  //     console.error("Login failed:", err);
  //     // Display error message if available
  //     if (err && typeof err === "object" && "data" in err) {
  //       if (
  //         err &&
  //         typeof err === "object" &&
  //         "data" in err &&
  //         err.data !== null &&
  //         typeof err.data === "object" &&
  //         "message" in err.data
  //       ) {
  //         setErrorMsgs((err.data as { message: string }).message);
  //       } else {
  //         setErrorMsgs(
  //           "Login failed. Please check your credentials and try again."
  //         );
  //       }
  //     } else {
  //       setErrorMsgs("An unexpected error occurred. Please try again later.");
  //     }
  //   }
  // };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password }).unwrap();

      dispatch(setUser(response.user));

      localStorage.setItem("user", JSON.stringify(response.user));

      onClose();
    } catch (err) {
      console.error("Login failed:", err);

      if (
        err &&
        typeof err === "object" &&
        "data" in err &&
        err.data !== null &&
        typeof err.data === "object" &&
        "message" in err.data
      ) {
        setErrorMsgs((err.data as { message: string }).message);
      } else {
        setErrorMsgs(
          "Login failed. Please check your credentials and try again."
        );
      }
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await registerUser({
        name: username,
        email,
        password,
      }).unwrap();
      localStorage.setItem("token", response.token);
      setIsFlipped(false);
    } catch (err: unknown) {
      console.error("Registration failed:", err);
      // Display error message if available
      if (
        err &&
        typeof err === "object" &&
        "data" in err &&
        err.data !== null &&
        typeof err.data === "object" &&
        "message" in err.data
      ) {
        setErrorMsgs((err.data as { message: string }).message);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
  };

  return (
    <div className={styles[`${isShowLogin ? "show-login" : "hide-login"}`]}>
      <div className={isShowLogin ? "show-login" : "hide-login"}>
        {/* If user is logged in, show their name and logout button */}
        {currentUser ? (
          <div className={styles.loggedIn}>
            <div className={styles.profileHeader}>
              <h3>Welcome, {currentUser.name}!</h3>
              <p className={styles.userEmail}>
                <span>Logged in email:</span> {currentUser.email}
              </p>
            </div>
            <div className={styles.profileActions}>
              <button className={styles.logoutButton}>
                Upload Profile Picture
              </button>
              <button className={styles.logoutButton} onClick={handleLogout}>
                Logout
              </button>
              <button className={styles.closeButton} onClick={onClose}>
                x
              </button>
            </div>
          </div>
        ) : (
          <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            initial={{ rotateY: 0 }}
            className={styles.card}
            transition={{ duration: 0.6 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Login Form */}
            <div className={`${styles.front} ${styles.side}`}>
              <h3>Sign In</h3>
              <form onSubmit={handleLogin}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit" disabled={isLoggingIn}>
                  {isLoggingIn ? "Logging in..." : "Login"}
                </button>
                {loginError && (
                  <p style={{ color: "black", fontSize: "1.8rem" }}>
                    {"data" in loginError
                      ? errorMsgs
                      : "Login failed. Try again."}
                  </p>
                )}
              </form>
              <p>
                Don't have an account?{" "}
                <button
                  className={styles.linkButton}
                  onClick={() => setIsFlipped(true)}
                >
                  Sign Up
                </button>
              </p>
              <button className={styles.closeButton} onClick={onClose}>
                X
              </button>
            </div>

            {/* Register Form */}
            <div className={`${styles.back} ${styles.side}`}>
              <h3>Sign Up</h3>
              <form onSubmit={handleRegister}>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button type="submit" disabled={isRegistering}>
                  {isRegistering ? "Registering..." : "Register"}
                </button>
                {registerError && (
                  <p style={{ color: "black", fontSize: "1.8rem" }}>
                    {"data" in registerError
                      ? errorMsgs
                      : "Registration failed. Try again."}
                  </p>
                )}
              </form>
              <p>
                Already have an account?{" "}
                <button
                  className={styles.linkButton}
                  onClick={() => setIsFlipped(false)}
                >
                  Sign In
                </button>
              </p>
              <button className={styles.closeButton} onClick={onClose}>
                X
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
