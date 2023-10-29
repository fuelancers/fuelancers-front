import { users } from "@/core/routesServices";
import { IResponse, IUser } from "@/interface/services";
import { fetchService } from "@/lib/fetchService";
import { MeService } from "@/services/user/me.service";
import { updateUser } from "@/storage/slice/user.slice";
import { AppStore } from "@/storage/store";
import { useDispatch, useSelector } from "react-redux";

export function useUpdateUser() {
    const userStorage = useSelector((store: AppStore) => store.user);
    const dispatch = useDispatch()

    const updateUserService = async () => {
        const user = await fetchService<IResponse<IUser>>(
            MeService(users.me, userStorage.token)
        );
        dispatch(updateUser(user.result?.data));
    }

    return { updateUserService }
}