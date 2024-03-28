import { createSlice } from "@reduxjs/toolkit";


const initialState:{authorized: boolean} = {
    authorized: false
}


const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {

    }
})

export default userSlice.reducer;