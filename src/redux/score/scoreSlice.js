import { createSlice } from "@reduxjs/toolkit";
import { getAllScores, addScore } from "./scoreOperations";

const initialState = {
  userScores: [],
  currentScore: 0,
  loading: false,
  error: null,
};

const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllScores.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllScores.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userScores = payload;
      })
      .addCase(getAllScores.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(addScore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addScore.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.currentScore = payload.score;
      })
      .addCase(addScore.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default scoreSlice.reducer;
