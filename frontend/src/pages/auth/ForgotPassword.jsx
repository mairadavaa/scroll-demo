import { motion } from "framer-motion";
import { useAuth } from "../../API/useAuth";
import { useContext, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { GlobalContext } from "../../context/GlobalContext";
import { formAnimation } from "../../utils/animationVariants";
import classes from "../../assets/styles/formStyles.module.scss";

export const ForgotPassword = () => {
  const { forgotPassword } = useAuth();
  const [userData, setUserData] = useState({ email: "" });
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
  const closeForPassComp = () => {
    setServerMsg({});
    setIsForPassOpen(false);
  };
  const openSignupComp = () => {
    setServerMsg({});
    setIsSignupOpen(true);
    setIsForPassOpen(false);
  };
  const openLoginComp = () => {
    setIsLoginOpen(true);
    setIsForPassOpen(false);
  };
  const formSubmit = (e) => {
    e.preventDefault();
    forgotPassword("/auth/forgot_password", userData);
  };

  return (
    <div className={classes.form}>
      <div className={classes.form_container}>
        <div onClick={closeForPassComp} className={classes.form_container_back} />
        <motion.div
          variants={formAnimation}
          initial="hidden"
          animate="visible"
          transition="transition"
          className={classes.form_container_main}
        >
          <AiOutlineClose onClick={closeForPassComp} className={classes.closeIcon} />
          <h1>Forgot password</h1>
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
              {serverMsg && <span className={classes.error}>{serverMsg.email}</span>}
            </div>
            <button type="submit" className={classes.submitBtn}>
              Send email
            </button>
            {userDetail && <span className={classes.success}>{serverMsg.msg}</span>}
          </form>
          <button onClick={openLoginComp}>Login</button>
        </motion.div>
      </div>
    </div>
  );
};
