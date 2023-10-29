import { ImageListType } from "react-images-uploading";
import { TypeListsSelect } from "../generics";


export interface IStorageGeneral {
    loading_page: boolean,
    lastFetch: string | null;
    device: number;

    imageUpload: ImageListType
}
