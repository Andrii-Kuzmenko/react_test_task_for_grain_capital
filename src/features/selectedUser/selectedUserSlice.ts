/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

export interface UserState {
  selectedUser: User | null;
}

const initialState: UserState = {
  selectedUser: null,
};

const selectedUserSlise = createSlice({
  name: 'selectedUser',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
  },
});

export default selectedUserSlise.reducer;
export const { setUser } = selectedUserSlise.actions;
