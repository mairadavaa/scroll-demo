import { Footer } from "./components";
import { useAuth } from "./API/useAuth";
import { useEffect, useContext } from "react";
import { AnimatePresence } from "framer-motion";
import { PageRender } from "./custom/PageRender";
import { Header } from "./components/layouts/Header";
import { GlobalContext } from "./context/GlobalContext";
import { Route, Routes, useLocation } from "react-router-dom";
import { Bag, Home, Login, Signup, Payment, ResetPassword, ForgotPassword } from "./pages";

const App = () => {
  const location = useLocation();
  const { refreshToken } = useAuth();
  const userLoggedIn = localStorage.getItem("UserLoggedIn");
  const {
    loginOpen: { isLoginOpen },
    signupOpen: { isSignupOpen },
    forPassOpen: { isForPassOpen },
  } = useContext(GlobalContext);
  useEffect(() => {
    if (userLoggedIn) {
      refreshToken("/auth/refresh_token");
    }
  }, [userLoggedIn]);
  return (
    <div>
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/:page" element={<PageRender />} />
          <Route path="/:page/:id" element={<PageRender />} />
          <Route path="/reset_password/:token" element={<ResetPassword />} />
          <Route path="/bag" element={<Bag />} />
        </Routes>
      </AnimatePresence>
      {/* <Footer /> */}
      {isLoginOpen && <Login />}
      {isSignupOpen && <Signup />}
      {isForPassOpen && <ForgotPassword />}
    </div>
  );
};

export default App;
