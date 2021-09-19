import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface AppMenuStateI {
  isOpen: boolean,
}

const initialState = { 
  isOpen: false, 
} as AppMenuStateI;

const slice = createSlice({
  name: 'appMenu',
  initialState,
  reducers: {
    setIsOpen(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
  },
})

export const { 
  setIsOpen, 
} = slice.actions;

export const appMenuIsOpen = (state: RootState) => state.appMenu.isOpen;

export default slice.reducer;