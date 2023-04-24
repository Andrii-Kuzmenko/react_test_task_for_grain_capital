/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';

export interface UsersState {
  users: User[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: UsersState = {
  users: [],
  loaded: false,
  hasError: false,
};

export const init = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

const usersSlise = createSlice({
  name: 'users',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<User>) => { 
      state.users.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload)
      }
    },
    update: (state, action: PayloadAction<User>) => {
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id !== action.payload.id) {
            return user;
          }
        
          return action.payload;
        })
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.fulfilled, (state, action) => {
      state.users = action.payload.map(user => ({...user, isUpdated: false}));
    });

    builder.addCase(init.rejected, () => {
      throw new Error("can't download users");
    });
  },
});

export default usersSlise.reducer;
export const { remove, add, update } = usersSlise.actions;
