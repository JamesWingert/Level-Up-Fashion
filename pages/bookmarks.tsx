import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

import { Card } from '../components/Card';
import prisma from '../lib/prisma';

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

const Bookmarks = ({ post }) => {
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
    toast.promise(deleteBookmark({ variables: { id: post.id } }), {
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
              <div key={post}>
                <button onClick={() => deleteBk()}> Remove bookmark</button>
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
  const id = params.id;
  const bookmark = await prisma.user.findMany({
    where: { id },
    select: {
      bookmarks: true,
    },
  });
  return {
    props: {
      bookmark,
    },
  };
};
