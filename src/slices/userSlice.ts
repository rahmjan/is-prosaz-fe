import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import bcrypt from 'bcryptjs'
import base64 from 'base-64'
import { AUTH_TOKEN, ROLE } from '../utils/constants'
import { UserDto } from '../api/users'

interface CurrentUserStateI {
  id: number,
  fullName: string,
  roles: ROLE[],
  authToken: string,
  isLogged: boolean,
  incommingAdress: string,
}

const initialState = { 
  id: -1, 
  fullName: 'unknown',
  roles: ["NONE"],
  authToken: '',
  incommingAdress: '',
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
    saveIncommingAddress(state, action: PayloadAction<string>) {
      state.incommingAdress = action.payload;
    },
    saveLoginUser(state, action: PayloadAction<UserDto>) {
      state.fullName = action.payload.name + " " + action.payload.surname;
      state.id = action.payload.id;
      state.roles = action.payload.roles;
    },
  },
})

export const { 
  createAuthToken, 
  saveIncommingAddress,
  saveLoginUser,
} = slice.actions;

export const currentUserAuthToken = (state: RootState) => state.currentUser.authToken;
export const currentUserFullName = (state: RootState) => state.currentUser.fullName;
export const currentUserRoles = (state: RootState) => state.currentUser.roles;
export const currentUserIsLogged = (state: RootState) => state.currentUser.isLogged;
export const incommingAddress = (state: RootState) => state.currentUser.incommingAdress;

export default slice.reducer;