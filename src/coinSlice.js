import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const coinSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    setByApi: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setByApi } = coinSlice.actions;

export default coinSlice.reducer;