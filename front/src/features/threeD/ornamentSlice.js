import { createSlice } from '@reduxjs/toolkit';

export const ornamentSlice = createSlice({
    name: 'ornament',
    initialState:{
        color: null,
    },
    reducers: {
        setColor: (state, action) => {
            state.color = action.payload;
        },
    }
})
export const { setColor } = ornamentSlice.actions;
export const selectColor = state => state.ornament.color;

export default ornamentSlice.reducer
