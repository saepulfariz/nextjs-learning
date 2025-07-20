"use client";

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
}

const initialState: CounterState = { value: 0 };
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number | undefined>) => {
      console.log(state, 16);
      console.log(action, 17);
      const incrementBy = action.payload !== undefined ? action.payload : 1;
      state.value += incrementBy;
    },
    decrement: (state, action: PayloadAction<number | undefined>) => {
      const decrementBy = action.payload !== undefined ? action.payload : 1;
      state.value -= decrementBy;
    },
    resetState: (state, action: PayloadAction<number>) => {
      console.log(state, 26);
      console.log(action, 27);
      state.value = action.payload;
    },
  },
});

export const { increment, decrement, resetState } = counterSlice.actions;
export default counterSlice.reducer;
