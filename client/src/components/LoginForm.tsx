import styles from "../styles/Login.module.css";
import { useSelector, useDispatch } from "react-redux";
import { selectIsShowLogin, hideLogin } from "../store/signinSlice";

// import isShowLogin from signinSlice and onclose from hideLogin
const LoginForm = () => {
  const isShowLogin = useSelector(selectIsShowLogin);
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(hideLogin());
  };
  return (
    <div className={styles[`${isShowLogin ? "show-login" : "hide-login"}`]}>
      <div className={isShowLogin ? "show-login" : "hide-login"}>
        <div>
          <h3>Sign In</h3>
          <form>
            <input type="text" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit">Login</button>
          </form>
        </div>
        <p>
          Don't have an account? <a href="#">Sign Up</a>
        </p>{" "}
        <button onClick={() => onClose()}>X</button>
      </div>
    </div>
  );
};
export default LoginForm;
