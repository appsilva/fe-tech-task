import { User } from './user';

export interface PostDTO {
  id: number;
  userId: number;
  body: string;
  title: string;
}

export interface UserPost extends PostDTO {
  author: User;
  highlighted?: boolean;
}
