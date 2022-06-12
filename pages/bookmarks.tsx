import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import React from 'react';

import { Card } from '../components/Card';

const BookmarksQuery = gql`
  query {
    bookmarks {
      title
      id
      url
      imageUrl
      description
      category
    }
  }
`;

const Bookmarks = () => {
  const { data, loading, error } = useQuery(BookmarksQuery);
  if (error)
    return (
      <>
        <p>Oops! Something went wrong </p>
        {error.message}
      </>
    );
  return (
    <div className="mx-auto my-20 max-w-5xl px-10">
      <h1 className="my-5 text-3xl font-medium">My Bookmarks</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className=" grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {data.bookmarks.length === 0 ? (
            <p className="text-2xl font-medium">
              You haven&apos;t bookmarked any posts yet 👀
            </p>
          ) : (
            data.bookmarks.map((post) => (
              <Link href={`/post/${post.id}`} key={post}>
                <a>
                  <Card
                    title={post.title}
                    description={post.description}
                    category={post.category}
                    imageUrl={post.imageUrl}
                    url={post.url}
                    id={post.id}
                  />
                </a>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
