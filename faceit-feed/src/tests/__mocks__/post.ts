import { UserPost } from '@/types';

export const post: UserPost = {
  id: 1,
  author: {
    id: 1,
    name: 'John Doe',
    avatar: 'url',
  },
  body: 'This is the body of the post.',
  highlighted: true,
  userId: 0,
  title: 'Post title',
};
