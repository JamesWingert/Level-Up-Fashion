import { enumType, objectType, stringArg } from 'nexus';
import { extendType } from 'nexus';

import { Post } from './Post';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.string('id');
    t.string('name');
    t.string('email');
    t.string('image');
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    t.field('role', { type: Role });
    t.list.field('bookmarks', {
      type: Post,
      async resolve(_parent, _args, ctx) {
        return ctx.prisma.user
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .bookmarks();
      },
    });
  },
});

const Role = enumType({
  name: 'Role',
  members: ['USER', 'ADMIN'],
});

export const Userbookmarks = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('bookmarks', {
      type: 'Post',
      async resolve(_, _args, ctx) {
        const user = await ctx.prisma.user.findUnique({
          where: {
            email: ctx.user.email,
          },
          include: {
            bookmarks: true,
          },
        });
        if (!user) console.error('User not found');
        return user.bookmarks;
      },
    });
  },
});

export const BookmarkPost = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('bookmarkPost', {
      type: 'Post',
      args: {
        id: stringArg(),
      },
      async resolve(_, args, ctx) {
        const post = await ctx.prisma.post.findUnique({
          where: { id: args.id },
        });

        await ctx.prisma.user.update({
          where: {
            email: ctx.user.email,
          },
          data: {
            bookmarks: {
              connect: {
                id: post.id,
              },
            },
          },
        });
        return post;
      },
    });
  },
});

export const DeleteBookmark = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('deleteBookmark', {
      type: 'Post',
      args: {
        id: stringArg(),
      },
      async resolve(_, args, ctx) {
        const post = await ctx.prisma.post.findUnique({
          where: { id: args.id },
        });

        await ctx.prisma.user.update({
          where: {
            email: ctx.user.email,
          },
          data: {
            bookmarks: {
              disconnect: {
                id: post.id,
              },
            },
          },
        });
        return null;
      },
    });
  },
});
