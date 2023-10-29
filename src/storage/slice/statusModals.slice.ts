import { createSlice } from "@reduxjs/toolkit";
import { IStorageStatusModals } from "../../interface/storage";

const initStateModal = {
    label: "",
    labelButton: "",
    show: false
}

export const EmptyUserState: IStorageStatusModals = {
    modal_language: initStateModal,
    modal_degree: initStateModal,
    modal_location: initStateModal,
    modal_portfolio: initStateModal,
    modal_services: initStateModal,
    modal_profile: false,
    modal_contanct: false,
    modal_workmode: false,
    modal_profile_header: initStateModal,
    modal_profile_bg_header: initStateModal,
};

export const UserKey = "user_thricos";

export const statusModals = createSlice({
    name: "statusModals",
    initialState: EmptyUserState,
    reducers: {
        updateModal: (state, action) => {
            const newState = { ...state, ...action.payload }
            return newState;
        },
    },
});

export const { updateModal } = statusModals.actions;

export default statusModals.reducer;
