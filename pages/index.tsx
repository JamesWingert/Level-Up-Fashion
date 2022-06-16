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
    variables: { first: 6 },
  });

  if (!user) {
    return (
      <div className="container mx-auto">
        <main className=" px-4 mx-auto mt-16 max-w-7xl sm:mt-24">
          <div className="p-5 text-center rounded-2xl ring-2 ring-inset ring-white bg-base-300">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              <span className="block font-Pacifico xl:inline text-info">
                Welcome!
              </span>{' '}
            </h1>
            <p className="mx-auto mt-3 max-w-md  text-base sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
              Level Up Fashion is a blog where we share fashion links, ideas,
              and pictures. We focus on sharing posts that we believe will
              interest people working in tech, but obviously everyone is
              welcome!
            </p>
            <div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link href="/api/auth/login" passHref>
                  <a
                    className="flex
                  justify-center  items-center py-3 px-8 w-full text-base font-medium text-white rounded-md border border-transparent md:py-4 md:px-10 md:text-lg bg-secondary-focus hover:bg-secondary"
                  >
                    Login or sign up!
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const { endCursor, hasNextPage } = data?.posts.pageInfo;

  return (
    <div className="h-full bg-base-200">
      <Head>
        <title>Level Up Fashion</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container  py-20 px-5 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data?.posts.edges.map(({ node }, i) => (
            // <Link href={`/post/${node.id}`} key={i}>
            <div className="hover:cursor-pointer" key={i}>
              <Card
                href={node.id}
                title={node.title}
                category={node.category}
                url={node.url}
                id={node.id}
                description={node.description}
                imageUrl={node.imageUrl}
              />
            </div>
            // </Link>
          ))}
        </div>
        {hasNextPage ? (
          <button
            className="py-2 px-4 my-10 text-white rounded bg-primary hover:bg-primary-focus"
            onClick={() => {
              fetchMore({
                variables: { after: endCursor },
              });
            }}
          >
            more
          </button>
        ) : (
          <p className="my-10 font-medium text-center">
            You&apos;ve reached the end!
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;
