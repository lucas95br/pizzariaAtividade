//Serve pra tipar os componetes props
import '../../styles/globals.scss'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Renderiza as paginas das rotas
 function App({ Component, pageProps }: AppProps) {
   
   return(
     <AuthProvider>
     
      <Component {...pageProps} />
      <ToastContainer autoClose ={3000}/>

    </AuthProvider>
    )
}
export default App;
