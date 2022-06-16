import '../styles/globals.css';

import { ApolloProvider } from '@apollo/client';
import { UserProvider } from '@auth0/nextjs-auth0';
import { Theme } from 'react-daisyui';

import Layout from '../components/Layout';
import { client } from '../lib/apollo';

function MyApp({ Component, pageProps }) {
  return (
    <Theme dataTheme="dracula" className="h-screen bg-base-200">
      <UserProvider>
        <ApolloProvider client={client}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </UserProvider>
    </Theme>
  );
}

export default MyApp;
