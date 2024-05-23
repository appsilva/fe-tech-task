import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { User, UserDTO } from '@/types';
import { showErrorToast } from '@/utils';

type UserState = {
  data: User[];
  isLoading: boolean;
  isError: boolean;
};

const initialState: UserState = {
  data: [],
  isLoading: false,
  isError: false,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();

    return users.map(
      ({ id, name }: UserDTO): User => ({
        id,
        name,
        avatar: `https://i.pravatar.cc/150?img=${id}`,
      })
    );
  } catch (error) {
    showErrorToast(error);
  }
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const selectUsers = (state: RootState) => state.users.data;
export default userSlice.reducer;
