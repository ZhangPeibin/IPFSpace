import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import '../styles/Loading.css'
import {SnackbarProvider} from "notistack";
function MyApp({ Component, pageProps }) {
  return   <SnackbarProvider maxSnack={1}>
    <Component {...pageProps} />
  </SnackbarProvider>
}

export default MyApp
