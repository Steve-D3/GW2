import styles from "../styles/Login.module.css";
import { useSelector, useDispatch } from "react-redux";
import { selectIsShowLogin, hideLogin } from "../store/signinSlice";
import { useState } from "react";
import { motion } from "framer-motion";
// import isShowLogin from signinSlice and onclose from hideLogin
const LoginForm = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const isShowLogin = useSelector(selectIsShowLogin);
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(hideLogin());
    setIsFlipped(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setConfirmPassword("");
    dispatch(hideLogin());
  };

  return (
    <div className={styles[`${isShowLogin ? "show-login" : "hide-login"}`]}>
      <div className={isShowLogin ? "show-login" : "hide-login"}>
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          initial={{ rotateY: 0 }}
          className={styles.card}
          transition={{ duration: 0.6 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className={`${styles.front} ${styles.side}`}>
            <h3>Sign In</h3>
            <form>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Login</button>
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

          <div className={`${styles.back} ${styles.side}`}>
            <h3>Sign Up</h3>
            <form>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button type="submit">Register</button>
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
      </div>
    </div>
  );
};
export default LoginForm;
