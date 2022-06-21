/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
import { gql, useMutation } from '@apollo/client';
import { getSession } from '@auth0/nextjs-auth0';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

const CreatePostMutation = gql`
  mutation (
    $title: String!
    $url: String!
    $imageUrl: String!
    $category: String!
    $description: String!
  ) {
    createPost(
      title: $title
      url: $url
      imageUrl: $imageUrl
      category: $category
      description: $description
    ) {
      title
      url
      imageUrl
      category
      description
    }
  }
`;

const Admin = () => {
  const [createPost, { data, loading, error }] =
    useMutation(CreatePostMutation);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { title, url, category, description, image } = data;
    console.log(data, image, image.name);
    const imageUrl = `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${image}`;
    const variables = { title, url, category, description, imageUrl };
    try {
      toast.promise(createPost({ variables }), {
        loading: 'Creating new post..',
        success: 'Post successfully created!🎉',
        error: `Something went wrong 😥 Please try again -  ${error}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container py-12 mx-auto max-w-md">
      <Toaster />
      <h1 className="my-5 text-3xl font-medium">Create a new post</h1>
      <form
        className="grid grid-cols-1 gap-y-6 p-8 rounded-lg shadow-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="block">
          <span className="text-gray-700">Title</span>
          <input
            placeholder="Title"
            name="title"
            type="text"
            {...register('title', { required: true })}
            className="block mt-1 w-full rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200/50 shadow-sm"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Description</span>
          <input
            placeholder="Description"
            {...register('description', { required: true })}
            name="description"
            type="text"
            className="block mt-1 w-full rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200/50 shadow-sm"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Url</span>
          <input
            placeholder="https://example.com"
            {...register('url', { required: true })}
            name="url"
            type="text"
            className="block mt-1 w-full rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200/50 shadow-sm"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Category</span>
          <input
            placeholder="Name"
            {...register('category', { required: true })}
            name="category"
            type="text"
            className="block mt-1 w-full rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200/50 shadow-sm"
          />
        </label>

        <button
          disabled={loading}
          type="submit"
          className="py-2 px-4 my-4 font-medium text-white capitalize bg-blue-500 hover:bg-blue-600 rounded-md"
        >
          {loading ? (
            <span className="flex justify-center items-center">
              <svg
                className="mr-1 w-6 h-6 animate-spin"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
              </svg>
              Creating...
            </span>
          ) : (
            <span>Create Post</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default Admin;

export const getServerSideProps = async ({ req, res }) => {
  const session = getSession(req, res);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/api/auth/login',
      },
      props: {},
    };
  }

  // const user = await prisma.user.findUnique({
  //   select: {
  //     email: true,
  //     role: true,
  //   },
  //   where: {
  //     email: session.user.email,
  //   },
  // });

  // if (user.role !== 'ADMIN') {
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: '/404',
  //     },
  //     props: {},
  //   };
  // }

  return {
    props: {},
  };
};
