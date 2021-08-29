import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import '../styles/Loading.css'
import {SnackbarProvider} from "notistack";
function MyApp({ Component, pageProps }) {
  return   <Component {...pageProps} />
}

export default MyApp
