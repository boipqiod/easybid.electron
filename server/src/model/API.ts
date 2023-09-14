import {ApiConfig, httpMethod} from "../utils/tpye";
import axios, {AxiosRequestConfig} from "axios"

export default class API{

    static shared: API = new API()
    private axios
    constructor(){
        this.axios = axios.create({
            // baseURL: `http://localhost:3003`
            baseURL: `http://152.69.231.177`
        })
    }

    private setConfig = <T>(apiConfig: ApiConfig, data: T): AxiosRequestConfig => {

        const config: AxiosRequestConfig = {
            method: apiConfig.method,
            url: `${apiConfig.url}`,
            headers: {
                'Content-Type': 'application/json',
            }
        }

        if (apiConfig.method === httpMethod.get) config.params = data
        else config.data = data

        return config
    }

    /**
     * 요청을 보내는 모듈
     * @param apiConfig
     * @param data
     */
    request = async <T, U>(apiConfig: ApiConfig, data?: T) =>{
        const config = this.setConfig(apiConfig, data)

        try {
            const res = await this.axios.request(config)
            // console.log(
            //     "\nAPI Request\n",
            //     config,
            //     "\nResponse \n",
            //     res.data as U
            // )
            return {success: true, data: res.data as U}
        }catch (e) {
            console.warn(
                "\nAPI Request\n",
                config,
                "\nError \n",
                e
            )
            return {success: false}
        }
    }


}