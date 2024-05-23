'use client';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { UserPost } from '@/types';
import { selectPosts } from '@/lib/features/postSlice';
import { useAppSelector } from '@/lib/hooks';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Avatar } from '@/components/Avatar';
import { showErrorToast } from '@/utils';
import { PostContainer, Button, PostDetailsContainer } from './page.styled';

/**
 * PostDetailPage component - displays the details of a post, including author information.
 * If the post is not found in the Redux store, it fetches the post details from
 * an external API, based on the post ID.
 */

const PostDetailPage = () => {
  const pathname = usePathname().split('/');
  const [post, setPost] = useState<UserPost>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { data: posts } = useAppSelector(selectPosts);

  useEffect(() => {
    const fetchPostDetails = async () => {
      let postDetails;

      try {
        const pResponse = await fetch(
          `https://jsonplaceholder.typicode.com/posts?id=${pathname[2]}`
        );
        const postResponse = await pResponse.json();

        if (postResponse?.length && postResponse[0].id) {
          try {
            const userResponse = await fetch(
              `https://jsonplaceholder.typicode.com/users?id=${postResponse[0].userId}`
            );

            const user = await userResponse.json();

            if (user?.length && user[0].id) {
              postDetails = {
                ...postResponse[0],
                author: {
                  id: user[0].id,
                  name: user[0].name,
                  avatar: `https://i.pravatar.cc/150?img=${user[0].id}`,
                },
              };
            }
          } catch (error) {
            showErrorToast(error);
          }
        }
      } catch (error) {
        showErrorToast(error);
      }

      postDetails?.id && setPost(postDetails);
      setIsLoading(false);
    };

    let postData;

    /**
     * Search for the post on the store
     */
    if (posts.length) {
      postData = posts?.find((p: UserPost) => p.id?.toString() === pathname[2]);
      postData?.id && setPost(postData);
      setIsLoading(false);
    }

    /**
     * If there is no match, it means the post is not on the store, therefore,
     * we need to fetch it from the API.
     * This should only hapen if the user accesses the detail page directly, instead
     * of navigating from the feed.
     */
    if (!postData) {
      fetchPostDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <PostContainer>
      <Link href="/">
        <Button>←</Button>
      </Link>
      {!post ? (
        <h1>Post not found</h1>
      ) : (
        <PostDetailsContainer>
          <Avatar src={post.author.avatar} alt={post.author.name} />
          <h1>{post.author.name}</h1>
          <p>{post.body}</p>
        </PostDetailsContainer>
      )}
    </PostContainer>
  );
};

export default PostDetailPage;
