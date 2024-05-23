import { highlightNewPost, removeHighlight } from '@/lib/features/postSlice';
import { useAppDispatch } from '@/lib/hooks';
import { useRef } from 'react';
import { toast } from 'react-toastify';

/**
 * Custom hook to periodically feed new posts and manage their highlighting and removal.
 * @returns Object containing the `feedNewPosts` function.
 */
export const useNewPostFeeder = () => {
  const dispatch = useAppDispatch();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Function to feed new posts at an interval and manage their highlighting and removal.
   * Dispatches actions to highlight new posts, display a toast message, and remove highlights after a timeout.
   * @returns Cleanup function to clear interval and timeout when component unmounts.
   */
  const feedNewPosts = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        const randomId = Math.floor(Math.random() * 10) + 1;

        const newPost = {
          id: Date.now(),
          userId: randomId,
          title: 'New Post Title',
          body: 'This is the body of the new post.',
          highlighted: true,
          author: {
            id: randomId,
            name: 'Leanne Graham',
            avatar: `https://i.pravatar.cc/150?img=${randomId}`,
          },
        };

        dispatch(highlightNewPost(newPost));
        toast('A new post has been added!');

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(
          () => dispatch(removeHighlight(newPost.id)),
          15000
        );
      }, 60000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  };

  return {
    feedNewPosts,
  };
};
