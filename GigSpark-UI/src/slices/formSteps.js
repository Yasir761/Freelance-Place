import { createSlice } from "@reduxjs/toolkit";

const initialState = 1;

const formStepSlice = createSlice({
  name: "formStep",
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
        return action.payload;
    }
  },
});

export const { setCurrentStep } = formStepSlice.actions;
export default formStepSlice.reducer;
