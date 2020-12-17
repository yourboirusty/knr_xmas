import { createSlice } from '@reduxjs/toolkit';
import * as THREE from 'three'
import api from "../../app/axios";


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


export const ornamentListSlice = createSlice({
    name: 'ornament_list',
    initialState:{
        ornaments: [],
    },
    reducers: {
        addOrnament: (state, action) => {
            state.ornaments.push(action.payload);
        },
        setOrnament: (state, action)=>{
            state.ornaments = action.payload;
        }
    },
})

export const { addOrnament, setOrnament } = ornamentListSlice.actions;
export const selectOrnaments = state => state.ornament_list.ornaments;

export const syncOrnamentsAsync = url => dispatch => {
    setTimeout(() => {
        let ornaments = [];
        api.get(url)
        .then((response) => {
            response.data.images.forEach((item) => {
            ornaments.push({
                texture: item.file,
                color: item.color
                })
            })
        dispatch(setOrnament(ornaments));
    }
    )
    }, 15000);
}

const ornamentReducer = ornamentSlice.reducer
const ornamentListReducer = ornamentListSlice.reducer

export {
    ornamentReducer,
    ornamentListReducer
}
