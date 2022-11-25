import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { useAuth } from "../../API/useAuth";
import { GlobalContext } from "../../context/GlobalContext";
import { formAnimation } from "../../utils/animationVariants";
import classes from "../../assets/styles/formStyles.module.scss";
import { AiOutlineClose, AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

export const Login = () => {
  const { login } = useAuth();
  const [passTypeChange, setPassTypeChange] = useState(false);
  const [userData, setUserData] = useState({ email: "", password: "" });
  const {
    user: { userDetail },
    loginOpen: { setIsLoginOpen },
    signupOpen: { setIsSignupOpen },
    msg: { serverMsg, setServerMsg },
    forPassOpen: { setIsForPassOpen },
  } = useContext(GlobalContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const typeChange = () => {
    setPassTypeChange(!passTypeChange);
  };
  const closeLoginComp = () => {
    setServerMsg({});
    setIsLoginOpen(false);
  };
  const openSignupComp = () => {
    setServerMsg({});
    setIsLoginOpen(false);
    setIsSignupOpen(true);
  };
  const openForPassComp = () => {
    setServerMsg({});
    setIsLoginOpen(false);
    setIsForPassOpen(true);
  };
  const formSubmit = (e) => {
    e.preventDefault();
    login("/auth/login", userData);
  };

  return (
    <div className={classes.form}>
      <div className={classes.form_container}>
        <div onClick={closeLoginComp} className={classes.form_container_back} />
        <motion.div
          variants={formAnimation}
          initial="hidden"
          animate="visible"
          transition="transition"
          className={classes.form_container_main}
        >
          <AiOutlineClose
            onClick={closeLoginComp}
            className={classes.closeIcon}
          />
          <h1>Login</h1>
          <div>
            <span>Need an account?</span>
            <button onClick={openSignupComp}>Sign up</button>
          </div>
          <form onSubmit={formSubmit}>
            <div className={classes.mailNumberBox}>
              <label htmlFor="mailOrNumber">Email or Phone number:</label>
              <input
                type="text"
                name="email"
                id="mailOrNumber"
                placeholder="Email..."
                onChange={handleChange}
                style={{
                  border: serverMsg.email ? "1px solid #C50C0C" : "none",
                }}
              />
              {serverMsg && (
                <span className={classes.error}>{serverMsg.email}</span>
              )}
            </div>
            <div className={classes.passwordBox}>
              <label htmlFor="password">Password:</label>
              <div
                style={{
                  border: serverMsg.password ? "1px solid #C50C0C" : "none",
                }}
              >
                <input
                  id="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="Password..."
                  type={passTypeChange ? "text" : "password"}
                />
                <span onClick={typeChange}>
                  {passTypeChange ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
              {serverMsg && (
                <span className={classes.error}>{serverMsg.password}</span>
              )}
            </div>
            <button type="submit" className={classes.submitBtn}>
              Login
            </button>
            {userDetail && (
              <span className={classes.success}>{userDetail.msg}</span>
            )}
          </form>
          <button onClick={openForPassComp}>Forgot password</button>
        </motion.div>
      </div>
    </div>
  );
};
