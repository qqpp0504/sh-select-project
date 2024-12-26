import { createSlice } from "@reduxjs/toolkit";

const initialAccountState = {
  email: "",
};

const accountSlice = createSlice({
  name: "account",
  initialState: initialAccountState,
  reducers: {
    updatedEmail(state, action) {
      state.email = action.payload;
    },
  },
});

export const accountActions = accountSlice.actions;

export default accountSlice.reducer;
