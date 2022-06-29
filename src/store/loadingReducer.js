import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    updateLoading: (state, action) => {
      state.loading = action?.payload;
      return state
    }
  },
});
export const { updateLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
