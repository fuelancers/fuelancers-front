export type SubcategoryLists = {
    _id: string;
    name: string;
    position: number;
    category: SubcategoryLists;
};

export type CategoryLists = {
    _id: string;
    name: string;
    subcategories: SubcategoryLists[];
};