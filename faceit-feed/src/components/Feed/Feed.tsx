import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  fetchPosts,
  incrementPage,
  selectPosts,
} from '@/lib/features/postSlice';
import { fetchUsers } from '@/lib/features/userSlice';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { UserPost } from '@/types';
import { useNewPostFeeder } from '@/hooks';
import { Post } from '@/components/Post';
import { LoadingSpinner } from '@/components/LoadingSpinner';

/**
 * The Feed component renders a feed of posts fetched from an API,
 * supports infinite scrolling, and handles loading and error states.
 */
export const Feed = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { feedNewPosts } = useNewPostFeeder();
  const { data: posts, isError } = useAppSelector(selectPosts);

  const fetchMorePosts = () => {
    dispatch(incrementPage());
    dispatch(fetchPosts());
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchUsers()).unwrap();
      await dispatch(fetchPosts()).unwrap();
      setIsLoading(false);
    };

    // If no posts are loaded initially, fetch data and trigger feedNewPosts
    if (!posts?.length) {
      fetchData();
      feedNewPosts();
    }

    // Restore scroll position from session storage, if defined
    const savedScrollPosition = sessionStorage.getItem('feedScrollPosition');
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition, 10));
      sessionStorage.removeItem('feedScrollPosition'); // Clean up
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>Feed</h1>

      {posts?.length ? (
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchMorePosts}
          loader={<LoadingSpinner />}
          hasMore
        >
          {posts.map((post: UserPost, index: number) => (
            <Post key={`post-${index}`} post={post} />
          ))}
        </InfiniteScroll>
      ) : isLoading ? (
        <LoadingSpinner />
      ) : (
        <h2>No posts found</h2>
      )}
      {isError ? <p>Something went wrong while fetching the posts</p> : null}
    </>
  );
};
