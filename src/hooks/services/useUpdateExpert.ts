import { experts, users } from "@/core/routesServices";
import { Expert, IResponse } from "@/interface/services";
import { fetchService } from "@/lib/fetchService";
import { GetExpertService } from "@/services/experts/experts.service";
import { updateExpert } from "@/storage/slice/expert.slice";
import { AppStore } from "@/storage/store";
import { useDispatch, useSelector } from "react-redux";

export function useUpdateExpert() {
    const userStorage = useSelector((store: AppStore) => store.user);
    const dispatch = useDispatch()

    const updateExpertService = async () => {
        const user = await fetchService<IResponse<Expert>>(
            GetExpertService(`${experts.list_experts}/${userStorage._id}`, userStorage.token)
        );
        // console.log("holiii 123")
        dispatch(updateExpert(user.result?.data));
    }

    return { updateExpertService }
}