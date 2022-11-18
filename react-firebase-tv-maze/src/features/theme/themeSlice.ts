import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface ThemeState {
  theme: 'dark' | 'ligth'
}

const initialState: ThemeState = {
  theme: 'dark',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    toggleTheme: (state) => {
      if(state.theme === 'dark')
        state.theme = 'ligth';
      else
        state.theme = 'dark';
    },
  },
});

export const { toggleTheme } = themeSlice.actions;


export const selectTheme = (state: RootState) => state.theme.theme;


export default themeSlice.reducer;
