import {createMuiTheme} from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
    shape:{
      borderRadius: 10
    },
    palette: {
        primary: {
            main: '#0F2D5B',
            dark: '#091D3C',
        },
        secondary: {
            main: '#D3D3D3',
            light: "#FFFFFF",
        },
        error: {
            main: '#E41349',
        },
        warning: {
            main: '#E41349',
        },
        info: {
            main: '#FDD205',
        },
        success: {
            main: '#FDD205',
        },
        background: {
            default: '#fff',
        },
    }
});

export default theme;
