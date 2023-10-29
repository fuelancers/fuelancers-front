import { TypeLists, TypeListsSelect } from "./ILists.interface";

export type TypeListDataFilter = {
    list_experience: TypeLists[];
    list_language: TypeLists[];
    list_workmode: TypeLists[];
    list_categories: TypeListsSelect[];
};

export class IFilter {
    public status: boolean;
    public data: TypeListDataFilter;

    constructor() {
        this.status = false;
        this.data = {
            list_experience: [],
            list_language: [],
            list_workmode: [],
            list_categories: [],

        };
    }
}
