export class LoginAccount {
    id: number;
    type: string;
    name: string;
    wechatId: string;

    loginType = (type: number): string => {
        switch (type) {
            case 0:
                return 'phone';
            case 1:
                return 'email';
            case 2:
                return 'wechat';
            default:
                return null;
        }
    }

}

