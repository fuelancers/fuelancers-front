import { TypeLists, TypeListsSelect } from '@/interface/generics/ILists.interface';

export function FormatListToSelect(list: TypeLists[]): TypeListsSelect[] {
    const format: TypeListsSelect[] = list.map((item) => ({
        _id: item._id,
        value: item.name,
        label: item.name,
    }));

    return format;
}

export function FormatSingleListToSelect(item: TypeLists): TypeListsSelect {
    const format: TypeListsSelect = {
        _id: item._id,
        value: item.name,
        label: item.name,
    };

    return format;
}
