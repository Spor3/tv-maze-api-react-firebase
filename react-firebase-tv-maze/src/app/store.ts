import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import themeReducer from '../features/theme/themeSlice';
import secondaryColorReducer from '../features/secondaryColor/secondaryColor'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    secondaryColor: secondaryColorReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
