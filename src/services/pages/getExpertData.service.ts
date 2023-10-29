import { IResponse } from "@/interface/services";
import { TypeLists } from "@/interface/generics";
import { Expert, User } from "@/interface/services/experts";
import { fetchService } from "@/lib/fetchService";
import { experts } from "@/core/routesServices";
import { GetExpertService } from "../experts/experts.service";

export type IResponseServicesExpertData = { expert: User | null, error: any }

export const getExpertData = async (id: string): Promise<IResponseServicesExpertData> => {

    const functions: any[] = [
        fetchService<IResponse<TypeLists[]>>(
            GetExpertService(`${experts.list_experts}/${id}`, "")
        ),
    ]

    return Promise.all(functions)
        .then(([expert_data]) => {

            return {
                expert: expert_data.result.data,
                error: null
            }
        })
        .catch((error) => {
            return {
                expert: null,
                error
            }
        })
}