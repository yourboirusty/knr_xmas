import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import {imageUrlReducer, imageDataReducer} from '../features/canvas/imageSlice';
import ornamentReducer from '../features/threeD/ornamentSlice';
export default configureStore({
  reducer: {
    counter: counterReducer,
    imageurl: imageUrlReducer,
    image: imageDataReducer,
    ornament: ornamentReducer,
  },
  devTools: true
});
