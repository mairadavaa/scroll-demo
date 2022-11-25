import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { useAuth } from "../../API/useAuth";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import { formAnimation } from "../../utils/animationVariants";
import classes from "../../assets/styles/formStyles.module.scss";
import { AiOutlineClose, AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

export const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const [passTypeChange, setPassTypeChange] = useState(false);
  const [cfPassTypeChange, setCfPassTypeChange] = useState(false);
  const [userData, setUserData] = useState({ newPass: "", cfNewPass: "" });
  const {
    user: { userDetail },
    loginOpen: { setIsLoginOpen },
    msg: { serverMsg, setServerMsg },
  } = useContext(GlobalContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const closeResPassComp = () => {
    setServerMsg({});
    navigate("/");
  };
  const openSignupComp = () => {
    setServerMsg({});
    navigate("/?signupOpen=true");
  };
  const openLoginComp = () => {
    setIsLoginOpen(true);
    navigate("/?loginOpen=true");
  };
  const formSubmit = (e) => {
    e.preventDefault();
    resetPassword(`/auth/reset_password/${token}`, userData);
  };

  return (
    <div className={classes.form}>
      <div className={classes.form_container}>
        <div
          onClick={closeResPassComp}
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
            onClick={closeResPassComp}
            className={classes.closeIcon}
          />
          <h1>Reset password</h1>
          <div>
            <span>Need an account?</span>
            <button onClick={openSignupComp}>Sign up</button>
          </div>
          <form onSubmit={formSubmit}>
            <div className={classes.passwordBox}>
              <label htmlFor="password">Password:</label>
              <div
                style={{
                  border: serverMsg.email ? "1px solid #C50C0C" : "none",
                }}
              >
                <input
                  id="Password"
                  name="newPass"
                  onChange={handleChange}
                  placeholder="Password..."
                  type={passTypeChange ? "text" : "password"}
                />
                <span onClick={() => setPassTypeChange(!passTypeChange)}>
                  {passTypeChange ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
              {serverMsg && (
                <span className={classes.error}>{serverMsg.newPass}</span>
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
                  name="cfNewPass"
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
              Reset password
            </button>
            {userDetail && (
              <span className={classes.success}>{serverMsg.msg}</span>
            )}
          </form>
          <button onClick={openLoginComp}>Login</button>
        </motion.div>
      </div>
    </div>
  );
};
