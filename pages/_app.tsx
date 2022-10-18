import '../styles/reset.css';
import '../styles/default.css';
import type { AppType } from 'next/app';
import { trpc } from '../utils/trpc';

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

//Higher order component what gets MyApp (aka whole client project) and injects code for you to use tRPC on the client
//You would not be able to use your trcp.[endpointName] if it weren't for this. It's like a provider.
export default trpc.withTRPC(MyApp);
