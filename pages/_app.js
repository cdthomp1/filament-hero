import 'tailwindcss/tailwind.css'
import Navigation from '../components/layout/Navigation';
import { UserProvider } from '@auth0/nextjs-auth0';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Navigation />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        rtl={false}
        draggable
      />
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp
