import 'tailwindcss/tailwind.css'
import Navigation from '../components/layout/Navigation';
import Toast from '../components/layout/Toast';
import Footer from '../components/layout/Footer';
import { UserProvider } from '@auth0/nextjs-auth0';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <div className="flex flex-col h-screen">
        <Navigation />
        <Toast />
        <div className='flex-grow'>
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </UserProvider>
  );
}

export default MyApp
