import dayjs, { Dayjs } from 'dayjs';

export class IExpertDegree {

    public field_study: string;
    public academic: string;
    public school: string;
    public start_date: string
    public end_date: string;
    public current_studying: boolean;


    constructor() {
        this.field_study = "";
        this.academic = "";
        this.school = "";
        this.start_date = "";
        this.end_date = "";
        this.current_studying = false
    }
}
