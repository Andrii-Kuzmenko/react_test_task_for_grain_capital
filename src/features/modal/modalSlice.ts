import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: boolean = false;

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<boolean>) => {
      return state = action.payload;
    },
  }
})

export default modalSlice.reducer;
export const { setModal } = modalSlice.actions;