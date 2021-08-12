import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { ROLE } from '../utils/types'
import bcrypt from 'bcryptjs'
import base64 from 'base-64'
import { ShortUserDto } from '../api/auth'
import { AUTH_TOKEN } from '../utils/constants'

interface CurrentUserStateI {
  id: number,
  name: string,
  roles: ROLE[],
  authToken: string,
  isLogged: boolean,
}

const initialState = { 
  id: -1, 
  name: 'unknown',
  roles: [],
  authToken: '',
  isLogged: false,
} as CurrentUserStateI

export interface LoginParamsI {
  username: string,
  password: string,
}

const slice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    createAuthToken(state, action: PayloadAction<LoginParamsI>) {
      const password = action.payload.password;
      const username = action.payload.username;
      const hash = password === 'test' ? password : bcrypt.hashSync(password, 2);
      state.authToken = base64.encode(username + ':' + hash);
      sessionStorage.setItem(AUTH_TOKEN, state.authToken);
    },
    saveLoginInformation(state, action: PayloadAction<ShortUserDto>) {
      state.id = action.payload.id;
      state.roles = action.payload.roles;
      state.isLogged = true;
    }
  },
})

export const { createAuthToken, saveLoginInformation } = slice.actions;

export const currentUserAuthToken = (state: RootState) => state.currentUser.authToken;
export const currentUserName = (state: RootState) => state.currentUser.name;

export default slice.reducer;