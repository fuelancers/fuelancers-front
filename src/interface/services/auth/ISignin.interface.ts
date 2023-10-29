export class DataSignIn {
    public email: string;
    public password: string;
    public keep_session: number[];

    constructor() {
        this.email = '';
        this.password = '';
        this.keep_session = [];
    }
}

export interface IResponseSignIn {
    access_token: string;
}
