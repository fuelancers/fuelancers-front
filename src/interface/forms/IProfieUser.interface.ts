export class DataProfileUser {
    public first_name: string;
    public last_name: string;
    public profession: string;
    public description: string;
    public location: string;
    public email: string;
    public phone: string;
    public fb_link: string;
    public ig_link: string;
    public twitter_link: string;
    public in_link: string;
    public change_password: string;

    constructor() {
        this.first_name = '';
        this.last_name = '';
        this.profession = '';
        this.description = '';
        this.location = '';
        this.email = '';
        this.phone = '';
        this.fb_link = '';
        this.ig_link = '';
        this.twitter_link = '';
        this.in_link = '';

        this.change_password = '';
    }
}

export interface IResponseSignIn {
    access_token: string;
}
