import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { useAuth } from "../../API/useAuth";
import { GlobalContext } from "../../context/GlobalContext";
import { formAnimation } from "../../utils/animationVariants";
import classes from "../../assets/styles/formStyles.module.scss";
import { AiOutlineClose, AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

export const Signup = () => {
  const { register } = useAuth();
  const [passTypeChange, setPassTypeChange] = useState(false);
  const [cfPassTypeChange, setCfPassTypeChange] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmPass: "",
  });
  const {
    msg: { serverMsg, setServerMsg },
    loginOpen: { setIsLoginOpen },
    signupOpen: { setIsSignupOpen },
  } = useContext(GlobalContext);
  const closeSignUpComp = () => {
    setServerMsg({});
    setIsSignupOpen(false);
  };
  const openLoginComp = () => {
    setServerMsg({});
    setIsLoginOpen(true);
    setIsSignupOpen(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const formSubmit = (e) => {
    e.preventDefault();
    register("/auth/register", userData);
  };

  return (
    <div className={classes.form}>
      <div className={classes.form_container}>
        <div
          onClick={closeSignUpComp}
          className={classes.form_container_back}
        />
        <motion.div
          variants={formAnimation}
          initial="hidden"
          animate="visible"
          transition="transition"
          className={classes.form_container_main}
        >
          <AiOutlineClose
            onClick={closeSignUpComp}
            className={classes.closeIcon}
          />
          <h1>Signup</h1>
          <div>
            <span>Already have an account?</span>
            <button onClick={openLoginComp}>Login</button>
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
                  border: serverMsg.email ? "1px solid #C50C0C" : "none",
                }}
              >
                <input
                  id="Password"
                  name="password"
                  onChange={handleChange}
                  placeholder="Password..."
                  type={passTypeChange ? "text" : "password"}
                />
                <span onClick={() => setPassTypeChange(!passTypeChange)}>
                  {passTypeChange ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
              {serverMsg && (
                <span className={classes.error}>{serverMsg.password}</span>
              )}
            </div>
            <div className={classes.passwordBox}>
              <label htmlFor="password">Confirm password:</label>
              <div
                style={{
                  border: serverMsg.email ? "1px solid #C50C0C" : "none",
                }}
              >
                <input
                  name="confirmPass"
                  id="confirmPassword"
                  onChange={handleChange}
                  placeholder="Confirm password..."
                  type={cfPassTypeChange ? "text" : "password"}
                />
                <span onClick={() => setCfPassTypeChange(!cfPassTypeChange)}>
                  {cfPassTypeChange ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
              {serverMsg && (
                <span className={classes.error}>{serverMsg.cfNewPass}</span>
              )}
            </div>

            <button type="submit" className={classes.submitBtn}>
              Sign up
            </button>
            {serverMsg && (
              <span className={classes.success}>{serverMsg.msg}</span>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
};
