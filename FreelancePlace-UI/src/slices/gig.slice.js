import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const gigSlice = createSlice({
  name: "Gig Slice",
  initialState,
  reducers: {
    setCurrentGig: (state, action) => {},
  },
});

export const { setCurrentGig } = gigSlice.actions;

export default gigSlice.reducer;
