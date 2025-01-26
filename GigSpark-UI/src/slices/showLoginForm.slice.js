import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showLoginForm: null,
  isLoading: false,
};

const authenticateSlice = createSlice({
  name: "Authenticate User",
  initialState,
  reducers: {
    showAuthenticatePage: (state, action) => {
        state.showLoginForm = action.payload
    },
    hideAuthenticatePage: (state, action) => {
        state.showLoginForm = null
    },
    changeLoadingState: (state, action) => {
        state.isLoading = action.payload
    },
  },
});

export const {
  hideAuthenticatePage,
  showAuthenticatePage,
  changeLoadingState,
} = authenticateSlice.actions;

export default authenticateSlice.reducer;
