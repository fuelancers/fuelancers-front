import { TypeLists } from '@/interface/generics/ILists.interface';

export interface IResponseGetList {
    code: number;
    data: TypeLists[];
    success: boolean;
}
