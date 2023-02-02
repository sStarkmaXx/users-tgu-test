import { InitialValuesType } from './../widgets/createUserForm/CreateUserForm';
import { UserType, users } from './users';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type UsersState = {
  allUsers: UserType[];
  selectedUsers: UserType[];
  openedUser?: UserType;
};

const initialState: UsersState = {
  allUsers: users,
  selectedUsers: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    openUser(state, action: PayloadAction<UserType>) {
      state.openedUser = action.payload;
    },
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
      state.allUsers.push(newUser);
    },
    editUser(state, action: PayloadAction<UserType>) {
      const editUserIndex = state.allUsers.findIndex(
        (user) => user.id === action.payload.id
      );
      state.allUsers[editUserIndex] = action.payload;
      state.openedUser = action.payload;
    },
    delUser(state, action: PayloadAction<UserType>) {
      if (state.selectedUsers.length) {
        state.allUsers = state.allUsers.filter(
          (user) => user.id !== action.payload.id
        );
        state.selectedUsers = state.selectedUsers.filter(
          (user) => user.id !== action.payload.id
        );
        state.openedUser = undefined;
      }
    },
  },
});

export const usersActions = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
