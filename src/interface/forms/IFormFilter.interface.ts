import { TypeListsSelect } from "../generics";

export enum EnumFilter {
    experience = 'Experience',
    language = 'Language',
    work_mode = 'Work mode',
    distance = 'Distance',
    skill = 'Skill',
}

export class IFormFilter {
    public range_price: string;

    public range_distance: string;

    public experience: number;

    public language: string[];

    public work_mode: string[];

    public skill: string[];

    public filters_active: EnumFilter[];

    public category: TypeListsSelect | null;

    public location: TypeListsSelect | null;


    constructor(price: string, distance: string) {
        this.range_price = price;

        this.range_distance = distance;

        this.experience = 0;

        this.language = [];

        this.skill = [];	

        this.work_mode = [];

        this.filters_active = [];

        this.category = null;

        this.location = null
    }
}
