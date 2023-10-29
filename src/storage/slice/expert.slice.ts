import { createSlice } from "@reduxjs/toolkit";
import { Expert } from "@/interface/services";

export const EmptyUserState: any = {
    _id: "",
    languages: [],
    profileInfo: null,
    skills: [],
    experience: null,
    degrees: [],
    services: [],
    status: {
        status: {
            _id: "",
            name: "",
        },
        createdAt: "",
    },
    portfolios: [],
    workmode: null
};


export const expertSlice = createSlice({
    name: "expert",
    initialState: EmptyUserState,
    reducers: {
        updateExpert: (state, action) => {
            const result = { ...state, ...action.payload };
            return result;
        },
    },
});

export const { updateExpert } = expertSlice.actions;

export default expertSlice.reducer;
