export interface IResponse<T> {
    code: number;
    data: T;
    success: boolean;
}
