import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

import { Card } from '../components/Card';
import { client } from '../lib/apollo';

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
const BookmarkDeleteMutation = gql`
  mutation ($id: String!) {
    deleteBookmark(id: $id) {
      title
      url
      imageUrl
      category
      description
    }
  }
`;

const Bookmarks = ({ bookmark }) => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [isLoading, setIsLoading] = useState(false);

  const { data, loading, error } = useQuery(BookmarksQuery);
  const [deleteBookmark] = useMutation(BookmarkDeleteMutation);
  if (error)
    return (
      <>
        <p>Oops! Something went wrong </p>
        {error.message}
      </>
    );

  const deleteBk = async () => {
    setIsLoading(true);
    toast.promise(deleteBookmark({ variables: { id: bookmark.id } }), {
      loading: 'Loading..',
      success: 'Deleted successfully!',
      error: `Something went wrong. Please try again`,
    });
    setIsLoading(false);
  };
  return (
    <div className="bg-base-300">
      <div className="container  py-20 px-5 mx-auto max-w-7xl">
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
              // data.bookmarks.map((post) => (
              <div key={bookmark}>
                <button onClick={() => deleteBk()}> Remove bookmark</button>
                <Card
                  href={bookmark.id}
                  title={bookmark.title}
                  description={bookmark.description}
                  category={bookmark.category}
                  imageUrl={bookmark.imageUrl}
                  url={bookmark.url}
                  id={bookmark.id}
                />
              </div>
              // ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;

export const getServerSideProps = async ({ params }) => {
  const { data } = await client.query({
    query: BookmarksQuery,
    variables: { id: params.id },
  });

  return {
    props: {
      bookmarks: data?.bookmarks,
    },
  };
};
