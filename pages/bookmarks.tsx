import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

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

const Bookmarks = () => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  const { data, loading, error } = useQuery(BookmarksQuery);

  const [deleteBookmark] = useMutation(BookmarkDeleteMutation);
  const router = useRouter();

  if (error)
    return (
      <>
        <p>Oops! Something went wrong </p>
        {error.message}
      </>
    );

  return (
    <div className="container py-20 px-5 mx-auto  max-w-7xl h-screen">
      <h1 className="my-5 text-3xl font-medium text-center">My Bookmarks</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className=" grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {data.bookmarks?.length === 0 ? (
            <p className="text-2xl font-medium">
              You haven&apos;t bookmarked any posts yet.
            </p>
          ) : (
            data.bookmarks?.map((post) => (
              <div key={post.id}>
                <Toaster />
                <button
                  className="py-2 px-4 my-4 font-medium text-white capitalize rounded-md bg-primary-focus hover:bg-primary"
                  onClick={async () => {
                    setIsLoading(true);
                    await toast.promise(
                      deleteBookmark({ variables: { id: post.id } }),
                      {
                        loading: 'Loading..',
                        success: 'Deleted successfully!',
                        error: `Something went wrong. Please try again`,
                      }
                    );
                    router.reload();
                    setIsLoading(false);
                  }}
                >
                  Remove bookmark
                </button>
                <Card
                  href={post.id}
                  title={post.title}
                  description={post.description}
                  category={post.category}
                  imageUrl={post.imageUrl}
                  url={post.url}
                  id={post.id}
                />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
