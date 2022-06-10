import { gql, useQuery } from '@apollo/client';
import { useUser } from '@auth0/nextjs-auth0';
import Head from 'next/head';
import Link from 'next/link';

import { Card } from '../components/Card';

const AllPostsQuery = gql`
  query allPostsQuery($first: Int, $after: String) {
    posts(first: $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          index
          imageUrl
          url
          title
          category
          description
          id
        }
      }
    }
  }
`;

function Home() {
  const { user } = useUser();

  const { data, loading, error, fetchMore } = useQuery(AllPostsQuery, {
    variables: { first: 3 },
  });

  if (!user) {
    return (
      <div className="flex items-center justify-center">
        To level up your fashion you need to{' '}
        <Link href="/api/auth/login">
          <a className=" mt-4 block rounded border-0 bg-gray-100 py-1 px-3 text-base hover:bg-gray-200 focus:outline-none md:mt-0">
            Login
          </a>
        </Link>
      </div>
    );
  }
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const { endCursor, hasNextPage } = data?.posts.pageInfo;

  return (
    <div>
      <Head>
        <title>Awesome Posts</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto my-20 max-w-5xl px-5">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {data?.posts.edges.map(({ node }, i) => (
            <Link href={`/post/${node.id}`} key={i}>
              <a>
                <Card
                  title={node.title}
                  category={node.category}
                  url={node.url}
                  id={node.id}
                  description={node.description}
                  imageUrl={node.imageUrl}
                />
              </a>
            </Link>
          ))}
        </div>
        {hasNextPage ? (
          <button
            className="my-10 rounded bg-blue-500 px-4 py-2 text-white"
            onClick={() => {
              fetchMore({
                variables: { after: endCursor },
              });
            }}
          >
            more
          </button>
        ) : (
          <p className="my-10 text-center font-medium">
            You&apos;ve reached the end!
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;
