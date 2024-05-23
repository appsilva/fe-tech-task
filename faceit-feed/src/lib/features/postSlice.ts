import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { UserPost, PostDTO, User } from '@/types';
import { showErrorToast } from '@/utils';

interface PostState {
  data: UserPost[];
  page: number;
  isLoading: boolean;
  isError: boolean;
}

const initialState: PostState = {
  data: [],
  page: 1,
  isLoading: false,
  isError: false,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { getState }) => {
    const {
      users,
      posts: { page },
    } = getState() as RootState;

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=20`
      );
      const postsData: PostDTO[] = await response.json();

      return postsData.map((post) => ({
        ...post,
        author: users.data.find(
          (user: User) => user.id === post.userId
        ) as User,
      }));
    } catch (error) {
      showErrorToast(error);
    }

    return [] as UserPost[];
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    incrementPage(state) {
      state.page += 1;
    },
    highlightNewPost(state, action: PayloadAction<UserPost>) {
      state.data.unshift({ ...action.payload, highlighted: true });
    },
    removeHighlight: (state, action: PayloadAction<number>) => {
      const index = state.data.findIndex((post) => post.id === action.payload);
      if (index !== -1) {
        state.data[index].highlighted = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      console.log('entrou');
      state.isLoading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = [...state.data, ...action.payload];
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { incrementPage, highlightNewPost, removeHighlight } =
  postSlice.actions;
export const selectPosts = (state: RootState) => state.posts;

export default postSlice.reducer;
