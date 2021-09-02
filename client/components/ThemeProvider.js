import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#124116'
    },
    secondary: {
      main: '#ffc400'
    } //#a5d6a7
  },
  breakpoints: {
    values: {
      tablet: 640,
      laptop: 1024,
      desktop: 1280,
    },
  }

});

export default theme;
