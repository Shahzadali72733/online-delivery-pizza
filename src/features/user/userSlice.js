import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Username: "shahzad",
};
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateName: (state, action) => {
            state.Username = action.payload;
        }
    }
});

export const { updateName } = userSlice.actions;

export default userSlice.reducer;