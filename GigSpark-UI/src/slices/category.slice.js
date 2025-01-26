import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const categorySlice = createSlice({
  name: "CategorySlice",
  initialState,
  reducers: {
    setAllCategory : ( state, action ) => {
      return action.payload;
    },
    addNewCategory: (state, action) => {
      const newCategory = { ...action.payload };
      state.push(newCategory);
    },
    deleteCategory: () => {
      const { categoryId } = action.payload;
      state.filter((cat) => cat?._id !== categoryId);
    },
    updateCategory: (state, action) => {
      const category = { ...action.payload };
      const categoryIndex = state.findIndex(
        (cat) => cat?._id === category?._id
      );
      if (categoryIndex) return state;
      state[categoryIndex] = category;
    },
  },
});

export const { addNewCategory, deleteCategory, updateCategory, setAllCategory } =
  categorySlice.actions;

export default categorySlice.reducer;
