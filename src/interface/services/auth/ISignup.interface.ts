export class DataSignUp {
    public clinic_name: string;
    public first_name: string;
    public last_name: string;
    public email: string;
    public password: string;
    public repeat_password: string;
    public acept_terms: boolean;
    public phone_number: string;

    constructor() {
        this.clinic_name = '';
        this.first_name = '';
        this.last_name = '';
        this.email = '';
        this.password = '';
        this.repeat_password = '';
        this.acept_terms = false;
        this.phone_number = '';
    }
}

export interface IResponseSignUp {
    access_token: string;
}
