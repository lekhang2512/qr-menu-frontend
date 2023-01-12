import '../styles/globals.scss'
import type { AppProps } from 'next/app'

import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '../utils/theme';
import { Provider } from 'react-redux'
import { store } from '../app/store'
import Notify from '../components/notify'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Notify />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}
