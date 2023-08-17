export class ElectronAPI {
    static get instance(): ElectronAPI {
        if (!ElectronAPI._instance) {
            ElectronAPI._instance = new ElectronAPI();
        }
        return ElectronAPI._instance;
    }
    private static _instance: ElectronAPI;
    private constructor() { }

    //요청 보내기
    request<T>(url: string, data: T) {

        console.log(url, data)

        // @ts-ignore
        window.data.sendDataToMainProcess('sendData', {
            url,
            data
        });
    }

}