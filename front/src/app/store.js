import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import {imageUrlReducer, imageDataReducer} from '../features/canvas/imageSlice';
import {ornamentReducer, ornamentListReducer} from '../features/threeD/ornamentSlice';
export default configureStore({
  reducer: {
    counter: counterReducer,
    imageurl: imageUrlReducer,
    image: imageDataReducer,
    ornament: ornamentReducer,
    ornament_list: ornamentListReducer,
  },
  devTools: true
});
