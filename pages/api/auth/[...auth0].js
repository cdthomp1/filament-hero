import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';
import loginHandlerFactory from '@auth0/nextjs-auth0/dist/auth0-session/handlers/login';

export default handleAuth();