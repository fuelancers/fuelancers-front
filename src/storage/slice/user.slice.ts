import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "@/interface/services/auth";
import { clearLocalStorage, persistLocalStorage } from "../../lib/localStorage";

export const EmptyUserState: IUser = {
    email: "",
    firstName: "",
    lastName: "",
    phone: null,
    role: null,
    _id: null,
    expert: null,
    profileInfo: null,
    picture: null,
    bgPhoto: null,
    token: ""
};

export const UserKey = "user_thricos";

export const userSlice = createSlice({
    name: "user",
    initialState: localStorage.getItem(UserKey)
        ? JSON.parse(localStorage.getItem(UserKey) as string)
        : EmptyUserState,
    reducers: {
        createUser: (state, action) => {
            persistLocalStorage<IUser>(UserKey, action.payload);
            return action.payload;
        },
        updateUser: (state, action) => {
            const result = { ...state, ...action.payload };
            persistLocalStorage<IUser>(UserKey, result);
            return result;
        },
        resetUser: () => {
            clearLocalStorage(UserKey);
            return EmptyUserState;
        },
    },
});

export const { createUser, updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
