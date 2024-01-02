import { createSlice } from '@reduxjs/toolkit'

export const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        data: null,
        selectGenres: [],
        selectActor: '',
        selectCountry: '',
        selectTopMovie: '',
    },
    reducers: {
        updateData: (state, action) => {
            state.data = action.payload
        },
        updateGenres: (state, action) => {
            if (action.payload === '') {
                state.selectGenres = []
            }
            else if (state.selectGenres.includes(action.payload)) {
                state.selectGenres = state.selectGenres.filter(item => (
                    item !== action.payload
                ))

            } else {
                state.selectGenres = [
                    ...state.selectGenres,
                    action.payload
                ]
            }
        },
        updateActor: (state, action) => {
            state.selectActor = action.payload
        },
        updateCountry: (state, action) => {
            state.selectCountry = action.payload
        },
        updateTopMovie: (state, action) => {
            state.selectTopMovie = action.payload
        },
    }
})

// Action creators are generated for each case reducer function
export const { updateData, updateGenres, updateActor, updateCountry, updateTopMovie } = filterSlice.actions

export default filterSlice.reducer