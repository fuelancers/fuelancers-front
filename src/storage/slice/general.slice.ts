import { createSlice } from "@reduxjs/toolkit";
import { IStorageGeneral } from "../../interface/storage";
import { TypeListsSelect } from "@/interface/generics";


export const EmptyUserState: IStorageGeneral = {
    loading_page: false,
    lastFetch: null,
    device: window.screen.width,

    imageUpload: []
};



export const UserKey = "user_thricos";

export const generalSlice = createSlice({
    name: "general",
    initialState: EmptyUserState,
    reducers: {
        handleLoadingPage: (state, action) => {
            const newState = { ...state, ...action.payload }

            return newState;
        },

        handleImageUpload: (state, action) => {
            const newState = { ...state, ...action.payload }
            return newState;
        },
    },
});

export const { handleLoadingPage, handleImageUpload } = generalSlice.actions;

export default generalSlice.reducer;
