import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Post } from '@/components/Post';
import { post } from '../__mocks__/post';

jest.mock('@/components/Avatar');

// Mock sessionStorage
const sessionStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock,
});

describe('Post component', () => {
  beforeEach(() => {
    sessionStorage.clear();
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<Post post={post} />);

    const authorName = screen.getByText('John Doe');
    const bodyText = screen.getByText('This is the body of the post.');

    expect(authorName).toBeInTheDocument();
    expect(bodyText).toBeInTheDocument();
  });

  it('renders correctly when body has more than 100 chars', () => {
    render(
      <Post
        post={{
          ...post,
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in augue pretium ligula tristique congue non sit amet turpis. Proin euismod sagittis egestas.',
        }}
      />
    );

    const authorName = screen.getByText('John Doe');
    const bodyText = screen.getByText(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in augue pretium ligula tristique con...'
    );

    expect(authorName).toBeInTheDocument();
    expect(bodyText).toBeInTheDocument();
  });

  it('triggers handlePostClick on link click and saves scroll position', () => {
    render(<Post post={post} />);

    const linkElement = screen.getByRole('link');
    fireEvent.click(linkElement);

    // Check that sessionStorage was called and the scroll position was saved
    expect(sessionStorage.getItem('feedScrollPosition')).toEqual(
      window.scrollY.toString()
    );
  });
});
