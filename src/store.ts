import { configureStore } from '@reduxjs/toolkit'
import currentUser from './slices/userSlice'
import appMenu from './slices/appMenuSlice'

export const store = configureStore({
  reducer: {
    currentUser,
    appMenu,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch