import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem('user')),
  sessionTimeout: JSON.parse(localStorage.getItem('sessionTimeout')),
};

const userSlice = createSlice({
  name: "User Slice",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.user = action.payload;
    },
    deleteCurrentUser: (state, action) => {
      state.user = null;
    },
    updateCurrentUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    updateSessionTimeout: (state, action) => {
      state.sessionTimeout = action.payload;
    },
    expireSessionTimeout: (state, action) => {
      state.sessionTimeout = null;
    },
  },
});

export const {
  setCurrentUser,
  deleteCurrentUser,
  updateCurrentUser,
  updateSessionTimeout,
  expireSessionTimeout,
} = userSlice.actions;

export default userSlice.reducer;
