import 'tailwindcss/tailwind.css'
import Navigation from '../components/layout/Navigation';
import Toast from '../components/layout/Toast';
import Footer from '../components/layout/Footer';
import { UserProvider } from '@auth0/nextjs-auth0';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Navigation />
      <Toast />
      <Component {...pageProps} />
      <Footer />
    </UserProvider>
  );
}

export default MyApp
