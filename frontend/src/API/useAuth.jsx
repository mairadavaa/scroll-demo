import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import { authAPI, patchAPI, getAPI } from "../utils/fetchingData";

export const useAuth = () => {
  const navigate = useNavigate();
  const {
    token: { setToken },
    msg: { setServerMsg },
    user: { setUserDetail },
    loginOpen: { setIsLoginOpen },
    signupOpen: { setIsSignupOpen },
  } = useContext(GlobalContext);
  const login = async (url, data) => {
    try {
      const res = await authAPI(url, data);
      setUserDetail(res?.data);
      localStorage.setItem("UserLoggedIn", "true");
      setTimeout(() => {
        setServerMsg({});
        setIsLoginOpen(false);
      }, 2000);
    } catch (error) {
      return setServerMsg(error?.response.data.msg);
    }
  };
  const register = async (url, data) => {
    try {
      const res = await authAPI(url, data);
      setServerMsg(res?.data);
      setTimeout(() => {
        setServerMsg({});
        setIsSignupOpen(false);
      }, 2000);
    } catch (error) {
      return setServerMsg(error?.response.data.msg);
    }
  };
  const forgotPassword = async (url, data) => {
    try {
      const res = await authAPI(url, data);
      setServerMsg(res?.data);
    } catch (error) {
      return setServerMsg(error?.response.data.msg);
    }
  };
  const resetPassword = async (url, data) => {
    try {
      const res = await patchAPI(url, data);
      setServerMsg(res?.data);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      return setServerMsg(error?.response.data.msg);
    }
  };
  const refreshToken = async (url) => {
    try {
      const res = await getAPI(url);
      setToken(res?.data.token);
      setUserDetail(res?.data.user);
    } catch (error) {
      return setServerMsg(error?.response.data.msg);
    }
  };
  return { login, register, forgotPassword, resetPassword, refreshToken };
};
