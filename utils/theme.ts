import { Outfit } from '@next/font/google';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const outfit = Outfit({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#FF3366',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: outfit.style.fontFamily,
  },
});

export default theme;