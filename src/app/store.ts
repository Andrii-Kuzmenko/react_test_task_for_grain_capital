import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice';
import selectedUserReducer from '../features/selectedUser/selectedUserSlice';
import searchQueryReduser from '../features/searchQuery/searchQuerySlice';
import modalReduser from '../features/modal/modalSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    selectedUser: selectedUserReducer,
    searchQuery: searchQueryReduser,
    modal: modalReduser,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
