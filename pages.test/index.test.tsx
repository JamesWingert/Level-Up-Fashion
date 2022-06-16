/* eslint-disable jest/expect-expect */
import { ApolloProvider } from '@apollo/client';
import { UserProvider } from '@auth0/nextjs-auth0';
import { render } from '@testing-library/react';

import { client } from '../lib/apollo';
import Index from '../pages/index';

// The easiest solution to mock `next/router`: https://github.com/vercel/next.js/issues/7479
// The mock has been moved to `__mocks__` folder to avoid duplication

describe('Index page', () => {
  describe('Render method', () => {
    it('should have h1 tag', () => {
      render(
        <UserProvider>
          <ApolloProvider client={client}>
            <Index />
          </ApolloProvider>
        </UserProvider>
      );
    });
  });
});
