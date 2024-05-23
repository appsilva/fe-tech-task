import { UserPost } from '../../types';
import Link from 'next/link';
import { PostContainer } from './Post.styled';
import { Avatar } from '../Avatar';

/**
 * Post component renders a single post with an author's avatar, name, and truncated body text.
 *
 * @param {Object} props - Component props
 * @param {UserPost} props.post - The post object containing post details
 */
export const Post = ({
  post: {
    author: { name, avatar },
    body,
    id,
    highlighted = false,
  },
}: {
  post: UserPost;
}) => {
  /**
   * Truncated body text to show only first 100 characters with '...' if body is longer than 100 characters.
   * If body has fewer than 100 chars, no truncation is applied.
   */
  const truncatedBody =
    body?.length > 100 ? `${body.substring(0, 100)}...` : body;

  const handlePostClick = () => {
    // Save the current scroll position before navigating to detail page
    sessionStorage.setItem('feedScrollPosition', window.scrollY.toString());
  };

  return (
    <Link href={`/post/${id}`} onClick={handlePostClick}>
      <PostContainer $highlighted={highlighted}>
        <Avatar src={avatar} alt={name} />

        <div>
          <h2>{name}</h2>
          <p>{truncatedBody}</p>
        </div>
      </PostContainer>
    </Link>
  );
};
