import {DisplaySetting} from "../common/tpye";

export default class Storage{

    private static FILENAME = "fileName"
    private static YOUTUBE_URL = "youtubeUrl"
    private static ID = "ebId"
    private static SETTING = "setting"

    static getFileName = () =>{
        return localStorage.getItem(Storage.FILENAME)
    }
    static saveFileName = (name: string) =>{
        localStorage.setItem(Storage.FILENAME, name)
    }

    static getYoutubeUrl = () =>{
        return localStorage.getItem(Storage.YOUTUBE_URL)
    }
    static saveYoutubeUrl = (url: string) =>{
        localStorage.setItem(Storage.YOUTUBE_URL, url)
    }
    static getEbId = (): string =>{
        return localStorage.getItem(Storage.ID) ?? ""
    }
    static saveEbId = (id: string) =>{
        localStorage.setItem(Storage.ID, id)
    }

    static getSetting = () =>{
        const setting = localStorage.getItem(Storage.SETTING)
        if(setting) return JSON.parse(setting) as DisplaySetting
        else return null
    }
    static saveSetting = (setting: DisplaySetting)=>{
        localStorage.setItem(Storage.SETTING, JSON.stringify(setting))
    }

}