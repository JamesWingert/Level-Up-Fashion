import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import prisma from '../../lib/prisma';

const BookmarkPostMutation = gql`
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

const Post = ({ post }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [deleteBookmark] = useMutation(BookmarkPostMutation);

  const bookmark = async () => {
    setIsLoading(true);
    toast.promise(deleteBookmark({ variables: { id: post.id } }), {
      loading: 'Loading..',
      success: 'Saved successfully!',
      error: `Something went wrong. Please try again`,
    });
    setIsLoading(false);
  };

  return (
    <div className="container px-8 mx-auto">
      <Toaster />
      <button
        onClick={() => bookmark()}
        className="py-2 px-4 my-4 font-medium text-white capitalize rounded-md bg-primary-focus hover:bg-primary"
      >
        {isLoading ? (
          <span className="flex justify-center items-center">
            <svg
              className="mr-1 w-6 h-6 animate-spin"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
            </svg>
            Saving...
          </span>
        ) : (
          <span>Bookmark</span>
        )}
      </button>
      <div className="flex justify-center">
        <div className="flex-col justify-center text-center">
          <h1 className="text-3xl">{post.title}</h1>
          <img
            src={post.imageUrl}
            className="max-w-5xl max-h-[60vh] rounded-lg shadow-lg"
            alt=""
          />
          <p className="text-base">{post.description}</p>
          <a
            className="text-base text-primary-focus hover:text-primary"
            href={`${post.url}`}
          >
            {post.url}
          </a>
        </div>{' '}
      </div>
    </div>
  );
};

export default Post;

export const getServerSideProps = async ({ params }) => {
  const id = params.id;
  const post = await prisma.post.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      category: true,
      url: true,
      imageUrl: true,
      description: true,
    },
  });
  return {
    props: {
      post,
    },
  };
};
