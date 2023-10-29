import { createSlice } from "@reduxjs/toolkit";
import { IListGeneralServices } from "../../interface/storage";


export const EmptyUserState: IListGeneralServices = {
    list_languages: [],
    list_proficiency: [],
};



export const UserKey = "user_thricos";

export const listGeneralsServices = createSlice({
    name: "list_general_services",
    initialState: EmptyUserState,
    reducers: {
        handleUpdateService: (state, action) => {
            const newState = { ...state, ...action.payload }

            return newState;
        },
    },
});

export const { handleUpdateService } = listGeneralsServices.actions;

export default listGeneralsServices.reducer;
