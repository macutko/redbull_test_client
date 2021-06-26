import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0F2D5B',
    },
    secondary: {
      main: '#091D3C',
    },
    error: {
      main: "#E41349",
    },
    background: {
      default: '#fff',
    },
  }
});

export default theme;
