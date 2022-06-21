import { connectionFromArraySlice, cursorToOffset } from 'graphql-relay';
import { extendType, nonNull, objectType, stringArg } from 'nexus';

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.string('id');
    t.int('index');
    t.int('userId');
    t.string('title');
    t.string('url');
    t.string('description');
    t.string('imageUrl');
    t.string('category');
  },
});

// get ALl Posts
export const PostsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.connectionField('posts', {
      type: Post,
      resolve: async (_, { after, first }, ctx) => {
        const offset = after ? cursorToOffset(after) + 1 : 0;
        if (isNaN(offset)) throw new Error('cursor is invalid');

        const [totalCount, items] = await Promise.all([
          ctx.prisma.post.count(),
          ctx.prisma.post.findMany({
            take: first,
            skip: offset,
          }),
        ]);

        return connectionFromArraySlice(
          items,
          { first, after },
          { sliceStart: offset, arrayLength: totalCount }
        );
      },
    });
  },
});
// get Unique Post
export const PostByIDQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('post', {
      type: 'Post',
      args: { id: nonNull(stringArg()) },
      resolve(_parent, args, ctx) {
        const post = ctx.prisma.post.findUnique({
          where: {
            id: args.id,
          },
        });
        return post;
      },
    });
  },
});

// create post
export const CreatePostMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createPost', {
      type: Post,
      args: {
        title: nonNull(stringArg()),
        url: nonNull(stringArg()),
        imageUrl: nonNull(stringArg()),
        category: nonNull(stringArg()),
        description: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        // const user = await ctx.prisma.user.findUnique({
        //   where: {
        //     email: ctx.user.email,
        //   },
        // });
        // || user.role !== 'ADMIN'
        // if (!user) {
        //   throw new Error(`You do not have permission to perform action`);
        // }
        const newPost = {
          title: args.title,
          url: args.url,
          imageUrl: args.imageUrl,
          category: args.category,
          description: args.description,
        };
        // eslint-disable-next-line @typescript-eslint/return-await
        return await ctx.prisma.post.create({
          data: newPost,
        });
      },
    });
  },
});

// update Post
export const UpdatePostMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('updatePost', {
      type: 'Post',
      args: {
        id: stringArg(),
        title: stringArg(),
        url: stringArg(),
        imageUrl: stringArg(),
        category: stringArg(),
        description: stringArg(),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.post.update({
          where: { id: args.id },
          data: {
            title: args.title,
            url: args.url,
            imageUrl: args.imageUrl,
            category: args.category,
            description: args.description,
          },
        });
      },
    });
  },
});
//  delete Post
export const DeletePostMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('deletePost', {
      type: 'Post',
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.post.delete({
          where: { id: args.id },
        });
      },
    });
  },
});
