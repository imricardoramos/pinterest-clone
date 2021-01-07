import '../styles/globals.css'
import { AuthProvider } from '~/providers/Auth'
import AppContext from '~/providers/App'
import { useState } from 'react'
import axios from 'axios'

axios.defaults.baseURL = process.env.BACKEND_URL;
axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }) {
 let [floatingMessageDismissed, setFloatingMessageDismissed] = useState(false)

  return (
    <AppContext.Provider
      value={{floatingMessageDismissed, setFloatingMessageDismissed}}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </AppContext.Provider>
  )
}

export default MyApp
