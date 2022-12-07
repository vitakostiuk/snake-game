import { createSlice } from "@reduxjs/toolkit";
import { getAllScores } from "./scoreOperations";

const initialState = {
  score: [],
};

const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // REDUCER FOR SIGN_UP
      .addCase(getAllScores.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllScores.fulfilled, (state, { payload }) => {
        console.log("payload", payload);
        state.loading = false;
        state.score = payload;
      })
      .addCase(getAllScores.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default scoreSlice.reducer;
