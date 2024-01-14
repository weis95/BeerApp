import { createTheme } from '@mui/material/styles';

// Took Busch Lights Colors

const primary = '#314973'
const secondary = '#00BCF1'

const theme = createTheme({
  palette: {
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: secondary,
          },
        },
      },
    },
  },
});

export { theme };
