import { configureStore } from '@reduxjs/toolkit'
import currentUser from './slices/userSlice'

export const store = configureStore({
  reducer: {
    currentUser,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch