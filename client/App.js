import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './components/ThemeProvider';
import Navbar from './components/Navbar';
import Routes from './Routes'
import SignUp from "./components/SignUp";

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Routes />
        {/* <SignUp /> */}
      </ThemeProvider>
    </div>
  );
};

export default App;
