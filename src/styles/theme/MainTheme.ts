import { createTheme } from '@mui/material/styles';

import '@fontsource/montserrat';

const theme = createTheme({
  spacing: 5,
  palette: {
    primary: {
      main: '#d9247b',
    },
    secondary: {
      main: '#E4E7EF',
    },
    warning: {
      main: '#FF7771',
    },
  },
  typography: {
    h1: {
      fontSize: '26px',
      lineHeight: '34px',
    },
    h2: {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: 600,
    },
    h3: {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: 500,
    },
    h4: {
      fontSize: '14px',
      lineHeight: '24px',
      color: '#383541',
      fontWeight: 700,
    },
    h5: {
      fontSize: '16px',
      lineHeight: '27px',
      fontWeight: 500,
      color: '#90929d',
    },
    body1: {
      fontSize: '14px',
      lineHeight: '24px',
      color: '#383541',
      fontWeight: 500,
    },
    body2: {
      fontSize: '14px',
      lineHeight: '24px',
      color: '#383541',
      fontWeight: 600,
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: 18,
    },
    fontFamily: ['Helvetica', 'sans-serif'].join(','),
    fontWeightLight: 'bold',
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@global': {
          '@font-face': [
            {
              fontFamily: 'Montserrat',
              fontStyle: 'normal',
            },
          ],
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          padding: '3px 15px',
          // minWidth: '360px',
          // '@media (max-width: 1920px)': {
          //   minWidth: '360px',
          // },
          '@media (max-width: 450px)': {
            minWidth: '300px',
          },
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.15)',
          background: '#FFFFFF',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          borderRadius: 12,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '19px',
          fontWeight: 700,
          padding: '8px 16px',
          borderRadius: '90px',
          background: 'linear-gradient(0deg, #A32561 -3.08%, #D9257C 24.94%, #D9247B 61.11%)',
          '@media (max-width: 1366px)': {
            fontSize: '16px',
          },
        },
        textPrimary: {
          color: '#ffffff',
        },
        containedPrimary: {
          padding: '8px 16px',
        },
        outlinedPrimary: {
          padding: '8px 16px',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        // root: {
        //   color: '#ffffff',
        // },
        colorPrimary: {
          background: 'linear-gradient(0deg, #A32561 -3.08%, #D9257C 24.94%, #D9247B 61.11%)',
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1366,
      xl: 1536,
    },
  },
});

export default theme;
