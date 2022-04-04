import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const favsSlice = createSlice({
  name: 'favs',
  initialState,
  reducers: {
    addItem: (state, action) =>{
      state.value = [...state.value, action.payload]
    },
    deleteItemById: (state, action) => {
      const newList = state.value.filter(fav => fav.id !==action.payload);
      state.value = newList;
    },
    setByApi: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setByApi, addItem, deleteItemById } = favsSlice.actions;

export default favsSlice.reducer;