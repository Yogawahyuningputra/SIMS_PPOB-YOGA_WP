import "./App.css";
import Registration from "./features/Registration";
import Dashboard from "./features/Dashboard";
import Login from "./features/Login";
import { Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./components/Layout"; // outlet
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import { isAuthenticated, selectCurrentToken } from "./features/auth/authSlice";
import { useEffect } from "react";
import NotFound from "./components/NotFound";
import { setAuthToken } from "./app/api";
import TopUp from "./components/TopUp";
import EditProfile from "./features/EditProfile";
import Transaction from "./components/Transaction";

function App() {
  const navigate = useNavigate();
  const isLogin = useSelector(isAuthenticated);
  const token = useSelector(selectCurrentToken);
  if (token) {
    setAuthToken(token);
  }
  useEffect(() => {
    if (isLogin) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [isLogin]);
  return (
    <>
      {isLogin && <Navbar />}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route exact path="registration" element={<Registration />} />
          <Route exact path="login" element={<Login />} />
          <Route exact path="dashboard" element={<Dashboard />} />
          <Route exact path="topup" element={<TopUp />} />
          <Route exact path="profile" element={<EditProfile />} />
          <Route exact path="transaction" element={<Transaction />} />
          <Route exact path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
