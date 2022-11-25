import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [serverMsg, setServerMsg] = useState({});
  const [userDetail, setUserDetail] = useState({});
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isForPassOpen, setIsForPassOpen] = useState(false);

  const state = {
    token: { token, setToken },
    msg: { serverMsg, setServerMsg },
    user: { userDetail, setUserDetail },
    loginOpen: { isLoginOpen, setIsLoginOpen },
    signupOpen: { isSignupOpen, setIsSignupOpen },
    forPassOpen: { isForPassOpen, setIsForPassOpen },
  };
  return (
    <GlobalContext.Provider value={state}>{children}</GlobalContext.Provider>
  );
};
