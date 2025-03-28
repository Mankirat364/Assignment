import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import UserList from "./pages/UserList";

function App() {

  const token = localStorage.getItem("Token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/register");
    }
  }, [token, navigate]);
useEffect(()=>{
  if(token){
    navigate('/userList')
  }
},[token, navigate]);
  return (
    <Routes>
      <Route path="/register" element={<Login />} />
      <Route path="/userList" element={<UserList />} />
    </Routes>
  );
}

export default function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}
