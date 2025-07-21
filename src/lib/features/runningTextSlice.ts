"use client";

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface RunningTextState {
  text: string;
  loading: boolean;
}

const initialState: RunningTextState = {
  text: "Tidak ada yang gagal, mereka hanya berhenti terlalu cepat. - Thomas Edison - ",
  loading: false,
};
export const runningTextSlice = createSlice({
  name: "runningText",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
  },
});

export const { setLoading, setText } = runningTextSlice.actions;
export default runningTextSlice.reducer;
