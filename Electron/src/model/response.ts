export interface Response<T>{
    success: boolean
    res?: T
}


export class APIResponse<T>{
    success: boolean
    data?: T

    constructor(success: boolean, data: T | undefined = undefined) {
        this.success = success
        this.data = data
    }

    static getRes = <T>(success: boolean, data: T | undefined = undefined) =>{
        return new APIResponse<T>(success, data)
    }
}