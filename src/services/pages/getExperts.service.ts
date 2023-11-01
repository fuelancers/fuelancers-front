import { IResponse } from "@/interface/services";
import { getListService } from "../generic/getLists.service";
import { TypeListDataFilter, TypeLists, TypeListsSelect } from "@/interface/generics";
import { Expert, User } from "@/interface/services/experts";
import { fetchService } from "@/lib/fetchService";
import { experts, genericsRoutes } from "@/core/routesServices";
import { FormatListToSelect } from "@/lib/formatList";
import { useState } from "react";

export type IResponseServicesExpertsPage = { filters: TypeListDataFilter, listExperts: Expert[] }

export const getExpertsServices = async (): Promise<IResponseServicesExpertsPage> => {

    const functions: any[] = [
        fetchService<IResponse<TypeLists[]>>(
            getListService(genericsRoutes.list_experience)
        ),
        fetchService<IResponse<TypeLists[]>>(
            getListService(genericsRoutes.list_language)
        ),
        fetchService<IResponse<TypeLists[]>>(
            getListService(genericsRoutes.list_workmode)
        ),
        fetchService<IResponse<TypeLists[]>>(
            getListService(genericsRoutes.list_skills)
        ),
        fetchService<IResponse<Expert[]>>(
            getListService(experts.list_experts)
        )
    ]
    return Promise.all(functions)
        .then(([list_experience, list_language, list_workmode, list_skills, list_experts]) => {
            const listSkills = !list_skills.error ? FormatListToSelect(list_skills.result.data) : [];

            const data: TypeListDataFilter = {
                list_experience: !list_experience.error ? list_experience.result.data : [],
                list_language: !list_language.error ? list_language.result.data : [],
                list_workmode: !list_workmode.error ? list_workmode.result.data : [],
                list_categories: listSkills,
            }

            return {
                filters: data,
                listExperts: !list_experts.error ? list_experts.result.data : []
            }
        })
        .catch((error) => {
            return error
        })
}