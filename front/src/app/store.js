import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import {imageUrlReducer, imageDataReducer} from '../features/canvas/imageSlice';
export default configureStore({
  reducer: {
    counter: counterReducer,
    imageurl: imageUrlReducer,
    image: imageDataReducer
  },
  devTools: true
});
