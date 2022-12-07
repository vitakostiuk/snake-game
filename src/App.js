import React from "react";
import { Route, Routes } from "react-router-dom";
import SnakeGame from "./components/SnakeGame";
import SignUp from "./components/SignUp";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SignUp />}></Route>
      <Route path="/home" element={<SnakeGame />}></Route>
    </Routes>
    //   <Routes>
    //   {/* AUTH */}
    //   <Route
    //     path="/"
    //     element={
    //       !isLoggedIn ? (
    //         <Navigate to="/login" replace />
    //       ) : (
    //         <ContactsPage />
    //       )
    //     }
    //   ></Route>

    //   {/* NOT AUTH */}
    //   <Route
    //     path="/register"
    //     element={
    //       isLoggedIn ? (
    //         <Navigate to="/contacts" replace />
    //       ) : (
    //         showModal && (
    //           <Modal>
    //             <RegisterPage toggleModal={toggleModal} />
    //           </Modal>
    //         )
    //       )
    //     }
    //   ></Route>
    //   <Route
    //     path="/login"
    //     element={
    //       isLoggedIn ? (
    //         <Navigate to="/contacts" replace />
    //       ) : (
    //         showModal && (
    //           <Modal>
    //             <LoginPage toggleModal={toggleModal} />
    //           </Modal>
    //         )
    //       )
    //     }
    //   ></Route>

    //   <Route
    //     path="*"
    //     element={
    //       <Container>
    //         <NotFound />
    //       </Container>
    //     }
    //   ></Route>
    // </Routes>
  );
};

export default App;
