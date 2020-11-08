export class LoginAccount {
    id: number;
    userid: number;
    type: string;
    thirdparty: number;
    phone: string;
    email: string;
    passwordtoken: string;
    logintime: Date;

    constructor() {
        this.id = 1;
        this.userid = 1;
        this.type = '';
        this.thirdparty = 0;
        this.phone = '';
        this.email = '';
        this.passwordtoken = '';
        this.logintime = new Date();
    }
}
