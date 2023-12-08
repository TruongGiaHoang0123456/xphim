import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: null
    },
    reducers: {
        login: (state, action) => {
            state.value = action.payload;
        },
        logout: (state, action) => {
            state.value = null;
        },
        updateLogin: (state, action) => {
            state.value = {
                ...state.value,
                [action.payload.nameUpdate]: action.payload.valueUpdate
            }
        }
    }
})

// Action creators are generated for each case reducer function
export const { login, logout, updateLogin } = userSlice.actions

export default userSlice.reducer