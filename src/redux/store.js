import { configureStore } from '@reduxjs/toolkit';
import filter from './filterSlice/index';

export default configureStore({
  reducer: { filter },
});
