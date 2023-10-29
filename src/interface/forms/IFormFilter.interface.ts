import { TypeListsSelect } from "../generics";

export enum EnumFilter {
    experience = 'Experience',
    language = 'Language',
    work_mode = 'Work mode',
}

export class IFormFilter {
    public range_price: string;

    public experience: string;

    public language: string[];

    public work_mode: string[];

    public skill: TypeListsSelect | null;

    public filters_active: EnumFilter[];

    public category: TypeListsSelect | null;

    public location: TypeListsSelect | null;


    constructor(price: string) {
        this.range_price = price;

        this.experience = "";

        this.language = [];

        this.skill = null

        this.work_mode = [];

        this.filters_active = [];

        this.category = null;

        this.location = null
    }
}
