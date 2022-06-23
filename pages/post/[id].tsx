import { gql, useMutation } from '@apollo/client';
import { getSession } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import prisma from '../../lib/prisma';

const BookmarkPostMutation = gql`
  mutation ($id: String!) {
    bookmarkPost(id: $id) {
      title
      url
      imageUrl
      category
      description
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

const Post = ({ post, user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [createBookmark] = useMutation(BookmarkPostMutation);
  const [deleteBookmark] = useMutation(BookmarkDeleteMutation);

  const router = useRouter();

  const bookmark = async () => {
    setIsLoading(true);
    await toast.promise(createBookmark({ variables: { id: post.id } }), {
      loading: 'Loading..',
      success: 'Saved successfully!',
      error: `Something went wrong. Please try again`,
    });
    router.reload();
    setIsLoading(false);
  };

  const isBookmarked = user.bookmarks.find((obj) => {
    return obj.id === post.id;
  });

  return (
    <div className="container mx-auto h-screen">
      <img
        className="mx-auto rounded-lg shadow-lg md:max-w-5xl md:max-h-[60vh]"
        src={post.imageUrl}
        alt=""
      />
      <div className="flex justify-center">
        <div className="flex-col justify-center space-y-6 text-center">
          <ul role="list">
            <li
              key={post.id}
              className="flex flex-col col-span-1 p-8 text-center bg-white rounded-lg divide-y divide-gray-200 shadow"
            >
              <div className="flex-col flex-1">
                <h3 className="text-sm font-medium text-gray-900">
                  {post.title}
                </h3>
                <dl className="flex flex-col grow justify-between mt-1">
                  <dt className="sr-only">Description</dt>
                  <dd className="text-sm text-gray-500">{post.description}</dd>
                  <dt className="sr-only">Role</dt>
                  <dd className="my-3">
                    <span className="py-1 px-2 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                      {post.category}
                    </span>
                  </dd>
                </dl>
              </div>
              <div>
                <div className="flex -mt-px divide-x divide-gray-200">
                  <div className="flex flex-1 w-0">
                    <a
                      href={post.url}
                      className="inline-flex relative z-50 flex-1 justify-center items-center py-4 -mr-px w-0 text-sm font-medium hover:underline hover:underline-offset-2 rounded-bl-lg border border-transparent text-primary-focus"
                    >
                      {/* removes https from url */}
                      {post.url.replace(/(^\w+:|^)\/\//, '')}
                      <span className="ml-3">
                        {' '}
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                        </svg>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </li>
          </ul>

          <div>
            <Toaster />

            {!isBookmarked ? (
              <>
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
              </>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

export const getServerSideProps = async ({ params, req, res }) => {
  const id = params.id;
  const session = getSession(req, res);
  const post = await prisma.post.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      category: true,
      url: true,
      imageUrl: true,
      description: true,
      users: true,
    },
  });
  const user = await prisma.user.findUnique({
    select: {
      email: true,
      bookmarks: true,
      id: true,
    },
    where: {
      email: session.user.email,
    },
  });
  return {
    props: {
      post,
      user,
    },
  };
};
