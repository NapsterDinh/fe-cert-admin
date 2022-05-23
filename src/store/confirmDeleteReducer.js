import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  title: '',
  body: ''
};

export const confirmReducerSlice = createSlice({
  name: "confirmDelete",
  initialState,
  reducers: {
    updateModalInfo: (state, action) => {
      state.title = action?.payload?.title;
      state.body = action?.payload?.body;
    },
    toggleShowModal: (state, action) => {
        state.show = action?.payload?.show;
      },
  },
});
export const { updateModalInfo, toggleShowModal } = confirmReducerSlice.actions;

export default confirmReducerSlice.reducer;
