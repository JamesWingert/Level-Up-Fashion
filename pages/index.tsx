/* eslint-disable tailwindcss/no-custom-classname */
import { gql, useQuery } from '@apollo/client';
import { useUser } from '@auth0/nextjs-auth0';
import Head from 'next/head';
import Link from 'next/link';

import { Card } from '../components/Card2';

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
        <main className=" mx-auto mt-16 max-w-7xl px-4 sm:mt-24">
          <div className="rounded-2xl bg-base-300 p-5 text-center ring-2 ring-inset ring-white">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              <span className="block font-Pacifico text-info xl:inline">
                Welcome!
              </span>{' '}
              {/* <span className="font-Pacifico block text-white xl:inline">
                Level Up Fashion
              </span> */}
            </h1>
            <p className="mx-auto mt-3 max-w-md  text-base sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
              Level Up Fashion is a place where people in the tech industry can
              come to share fashion links, images, ideas, and get inspired by
              others.
            </p>
            <div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link href="/login" passHref>
                  <a
                    className="flex
                  w-full  items-center justify-center rounded-md border border-transparent bg-secondary-focus px-8 py-3 text-base font-medium text-white hover:bg-secondary md:py-4 md:px-10 md:text-lg"
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
    <div className="bg-base-300">
      <Head>
        <title>Level Up Fashion</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container  mx-auto max-w-7xl px-5 py-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data?.posts.edges.map(({ node }, i) => (
            <Link href={`/post/${node.id}`} key={i}>
              <div className="hover:cursor-pointer">
                <Card
                  title={node.title}
                  category={node.category}
                  url={node.url}
                  id={node.id}
                  description={node.description}
                  imageUrl={node.imageUrl}
                />
              </div>
            </Link>
          ))}
        </div>
        {hasNextPage ? (
          <button
            className="my-10 rounded bg-primary px-4 py-2 text-white hover:bg-primary-focus"
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
