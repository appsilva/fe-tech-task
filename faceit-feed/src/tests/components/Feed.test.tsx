import React, { act } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { fetchPosts, incrementPage } from '@/lib/features/postSlice';
import { fetchUsers } from '@/lib/features/userSlice';
import { useNewPostFeeder } from '@/hooks';
import { Feed } from '@/components/Feed';

jest.mock('@/lib/hooks', () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));
jest.mock('@/lib/features/postSlice', () => ({
  fetchPosts: jest.fn(),
  incrementPage: jest.fn(),
}));
jest.mock('@/lib/features/userSlice', () => ({
  fetchUsers: jest.fn(),
}));
jest.mock('@/hooks', () => ({
  useNewPostFeeder: jest.fn(),
}));
jest.mock('@/components/Post');

const mockDispatch = jest.fn(() => ({
  unwrap: jest.fn().mockResolvedValueOnce(undefined),
}));

describe('Feed component', () => {
  beforeEach(() => {
    (useAppDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as unknown as jest.Mock).mockReturnValue({
      data: [],
      isError: false,
    });
    (fetchPosts as unknown as jest.Mock).mockReturnValue({
      type: 'fetchPosts',
    });
    (incrementPage as unknown as jest.Mock).mockReturnValue({
      type: 'incrementPage',
    });
    (fetchUsers as unknown as jest.Mock).mockReturnValue({
      type: 'fetchUsers',
    });
    (useNewPostFeeder as jest.Mock).mockReturnValue({
      feedNewPosts: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Feed component', async () => {
    render(<Feed />);

    expect(screen.getByText('Feed')).toBeInTheDocument();
    expect(mockDispatch).toHaveBeenCalledWith(fetchUsers());

    // While it's fetching, it should show the loading spinner
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

    // After fetching the users, it should fetch the posts
    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith(fetchPosts())
    );

    // After the fetches, it should show the 'No posts found' message
    await waitFor(() =>
      expect(screen.getByText('No posts found')).toBeInTheDocument()
    );
  });

  it('fetches more posts when scrolled to the bottom', async () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue({
      data: [{}],
      isError: false,
    });

    render(<Feed />);

    window.scrollTo = jest.fn();

    // Simulate scroll to bottom
    global.window.innerHeight = 1000;
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: 1000,
      writable: true,
    });
    window.scrollY = 1000;

    act(() => window.dispatchEvent(new Event('scroll')));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(incrementPage());
      expect(mockDispatch).toHaveBeenCalledWith(fetchPosts());
    });
  });

  it('displays an error message when there is an error', async () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue({
      data: [],
      isError: true,
    });

    render(<Feed />);

    await waitFor(() =>
      expect(
        screen.getByText('Something went wrong while fetching the posts')
      ).toBeInTheDocument()
    );
  });
});
