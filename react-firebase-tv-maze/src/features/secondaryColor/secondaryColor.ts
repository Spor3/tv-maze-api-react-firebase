import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface SecondaryColorType {
    secondaryColor: 'yellow' | 'blue' | 'green' | 'red' 
}

const initialState: SecondaryColorType = {
    secondaryColor: 'yellow',
};

export const secondaryColorSlice = createSlice({
  name: 'secondaryColor',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    changeSecondaryColor: (state, action) => {
        state.secondaryColor = action.payload;
    },
  },
});

export const { changeSecondaryColor } = secondaryColorSlice.actions;


export const selectSecondaryColor = (state: RootState) => state.secondaryColor.secondaryColor;


export default secondaryColorSlice.reducer;