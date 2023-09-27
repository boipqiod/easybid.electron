import {FireStoreUtil} from "../utils/FireStoreUtil";

export default class AuthService{
    static shared: AuthService = new AuthService()

    login = async (id: string, passkey: string) =>{
        //문서를 가져옴
        const data = await FireStoreUtil.instance.getDocData(id, "_auth");
        if (!data) return false;
        const _passkey = data.passkey;
        //passkey 가 일치하면 true
        return _passkey === passkey
    }
}