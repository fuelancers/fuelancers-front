import { TypeListsSelect } from "../generics";

export enum EnumFilter {
    experience = 'Experience',
    language = 'Language',
    work_mode = 'Work mode',
    distance = 'Distance',
}

export class IFormFilter {
    public range_price: string;

    public range_distance: string;

    public experience: string;

    public language: string[];

    public work_mode: string[];

    public skill: TypeListsSelect | null;

    public filters_active: EnumFilter[];

    public category: TypeListsSelect | null;

    public location: TypeListsSelect | null;


    constructor(price: string, distance: string) {
        this.range_price = price;

        this.range_distance = distance;

        this.experience = "";

        this.language = [];

        this.skill = null

        this.work_mode = [];

        this.filters_active = [];

        this.category = null;

        this.location = null
    }
}
