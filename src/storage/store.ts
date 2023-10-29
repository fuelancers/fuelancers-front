import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slice/user.slice";
import { statusModals } from "./slice/statusModals.slice";
import { generalSlice } from "./slice/general.slice";
import { IListGeneralServices, IStorageGeneral, IStorageStatusModals } from "@/interface/storage";
import { Expert, IUser } from "@/interface/services";
import { listGeneralsServices } from "./slice/listGeneralsServices.slice";
import { expertSlice } from "./slice/expert.slice";

export interface AppStore {
  user: IUser;
  general: IStorageGeneral;
  statusModals: IStorageStatusModals;
  listGeneralServices: IListGeneralServices;
  expert: Expert;
}

export default configureStore<AppStore>({
  reducer: {
    user: userSlice.reducer,
    general: generalSlice.reducer,
    statusModals: statusModals.reducer,
    listGeneralServices: listGeneralsServices.reducer,
    expert: expertSlice.reducer
  },
});
