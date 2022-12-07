import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { authSelectors } from "./redux/auth";
import SnakeGame from "./components/SnakeGame";
import SignUp from "./components/SignUp";

const App = () => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  return (
    <Routes>
      {/* AUTH */}
      <Route
        path="/home"
        element={!isLoggedIn ? <Navigate to="/" replace /> : <SnakeGame />}
      ></Route>

      {/* NOT AUTH */}
      <Route
        path="/"
        element={isLoggedIn ? <Navigate to="/home" replace /> : <SignUp />}
      ></Route>

      <Route path="*" element={<SnakeGame />}></Route>
    </Routes>
  );
};

export default App;
