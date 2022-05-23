import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: '',
};

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {

      state.user = action?.payload;
    },
  },
});
export const { updateUser } = counterSlice.actions;

export default counterSlice.reducer;
