import { InitialValuesType } from './../widgets/createUserForm/CreateUserForm';
import { UserType, users } from './users';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type UsersState = {
  allUsers: UserType[];
  selectedUsers: UserType[];
};

const initialState: UsersState = {
  allUsers: users,
  selectedUsers: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    selectUser(state, action: PayloadAction<UserType>) {
      const selectedUser = state.selectedUsers.find(
        (user) => user.id === action.payload.id
      );
      if (selectedUser) {
        state.selectedUsers = state.selectedUsers.filter(
          (user) => user.id !== selectedUser.id
        );
      } else {
        state.selectedUsers.push(action.payload);
      }
    },
    createNewUser(state, action: PayloadAction<InitialValuesType>) {
      const newUser: UserType = {
        ...action.payload,
        id: new Date().getMilliseconds(),
        createDate: new Date().toISOString(),
      };
      console.log(newUser);
      state.allUsers.push(newUser);
    },
    delUser(state, action: PayloadAction<UserType[]>) {
      if (state.selectedUsers.length) {
        state.allUsers = state.allUsers.filter(
          (user) =>
            !state.selectedUsers.some((selectUser) => user.id === selectUser.id)
        );
        state.selectedUsers = [];
      }
    },
  },
});

export const usersActions = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
