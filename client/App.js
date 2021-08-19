import React from "react";

import Navbar from "./components/Navbar";
import Routes from "./Routes";
import SignUp from "./components/SignUp";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <SignUp />
    </div>
  );
};

export default App;
