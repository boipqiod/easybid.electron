import API from "../model/API";
import {ApiConfig, httpMethod} from "../common/tpye";

export default class AuthService{
    static shared: AuthService = new AuthService()

    login = async (id: string) =>{

        const config: ApiConfig = {
            url: "/auth/login",
            method: httpMethod.post
        }

        const body = {
            directoryName: id
        }

        const res = await API.shared.request<{
            directoryName: string
        }, boolean>(config,body)

        console.log("AuthService", res)

        return res.data ?? false
    }
}