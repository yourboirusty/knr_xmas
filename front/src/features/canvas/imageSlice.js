import { createSlice } from '@reduxjs/toolkit';

export const imageUrlSlice = createSlice({
    name: 'imageurl',
    initialState:{
        url: null,
    },
    reducers: {
        setUrl: (state, action) => {
            state.url = action.payload;
        },
    }
})
export const { setUrl } = imageUrlSlice.actions;
export const selectImageUrl = state => state.imageurl.url;


export const imageDataSlice = createSlice({
    name: 'image',
    initialState:{
        img: null,
    },
    reducers: {
        setImg: (state, action) => {
            state.img = action.payload;
        },
    }
})

export const { setImg } = imageDataSlice.actions;
export const selectImageData = state => state.image.img;

let imageUrlReducer = imageUrlSlice.reducer
let imageDataReducer = imageDataSlice.reducer

export {
    imageUrlReducer,
    imageDataReducer
}