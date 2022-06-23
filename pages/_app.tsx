import '../styles/globals.css';

import { ApolloProvider } from '@apollo/client';
import { UserProvider } from '@auth0/nextjs-auth0';

import Layout from '../components/Layout';
import { ThemeProvider } from '../context/ThemeContext';
import { client } from '../lib/apollo';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <UserProvider>
        <ApolloProvider client={client}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default MyApp;
