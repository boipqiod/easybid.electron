import API from "../model/API";
import {ApiConfig, httpMethod} from "../utils/tpye";
import {FireStoreUtil} from "../utils/FireStoreUtil";

export default class AuthService{
    static shared: AuthService = new AuthService()

    login = async (id: string, passkey: string) =>{
        //문서를 가져옴
        const data = await FireStoreUtil.instance.getSingleDocData(id, "auth");
        if (!data) return false;
        const _passkey = data.passkey;
        //passkey가 일치하면 true
        return _passkey === passkey
    }

    // login = async (id: string) =>{
    //
    //     const config: ApiConfig = {
    //         url: "/auth/login",
    //         method: httpMethod.post
    //     }
    //
    //     const body = {
    //         directoryName: id
    //     }
    //
    //     const res = await API.shared.request<{
    //         directoryName: string
    //     }, boolean>(config,body)
    //
    //     console.log("AuthService", res)
    //
    //     return res.data ?? false
    // }
}