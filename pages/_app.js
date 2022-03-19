import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import '../styles/Loading.css'
import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/style.scss'

import {SnackbarProvider} from "notistack";

function MyApp({Component, pageProps}) {
    return (
        <SnackbarProvider>
            <Component {...pageProps} />
        </SnackbarProvider>
    )
}

export default MyApp
