import { createSlice } from "@reduxjs/toolkit";

const apiSlice = createSlice({
  name: "api",
  initialState: { baseURL: "https://reqres.in/" },
  reducers: {
    setBaseURL: (state, action) => {
      state.baseURL = action.payload;
    },
  },
});

export const { setBaseURL } = apiSlice.actions;
export default apiSlice.reducer;
