export default class UserController {
    static instance: UserController = new UserController();

    private constructor() { }

    isLogin = false;
    id: string = "";

    login = (id: string) => {
        this.isLogin = true;
        this.id = id;
    }
}