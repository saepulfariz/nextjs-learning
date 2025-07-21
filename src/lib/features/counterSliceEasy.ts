import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterStateEasy {
  value: number;
}

const initialState: CounterStateEasy = { value: 0 };

export const counterSliceEasy = createSlice({
  name: "counterEasy",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } =
  counterSliceEasy.actions;
export default counterSliceEasy.reducer;
