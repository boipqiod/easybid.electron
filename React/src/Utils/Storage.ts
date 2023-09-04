import {DisplaySetting} from "../common/tpye";

export default class Storage {

    private static FILENAME = "fileName"
    private static YOUTUBE_URL = "youtubeUrl"
    private static ID = "ebId"
    private static TOKEN = "token"
    private static SETTING = "setting"
    private static COPY = "copy"

    static getFileName = () => {
        return localStorage.getItem(Storage.FILENAME)
    }
    static saveFileName = (name: string) => {
        localStorage.setItem(Storage.FILENAME, name)
    }
    static getYoutubeUrl = () => {
        return localStorage.getItem(Storage.YOUTUBE_URL)
    }
    static saveYoutubeUrl = (url: string) => {
        localStorage.setItem(Storage.YOUTUBE_URL, url)
    }
    static getEbId = (): string => {
        return localStorage.getItem(Storage.ID) ?? ""
    }
    static saveEbId = (id: string) => {
        localStorage.setItem(Storage.ID, id)
    }

    static saveToken = (token: string) => {
        localStorage.setItem(Storage.TOKEN, token)
    }
    static getToken = (): string => {
        return localStorage.getItem(Storage.TOKEN) ?? ""
    }

    static getSetting = () => {
        const setting = localStorage.getItem(Storage.SETTING)
        if (setting) return JSON.parse(setting) as DisplaySetting
        else return null
    }
    static saveSetting = (setting: DisplaySetting) => {
        localStorage.setItem(Storage.SETTING, JSON.stringify(setting))
    }

    static saveTextList = (copyText: string[]) => {
        localStorage.setItem(Storage.COPY, JSON.stringify(copyText))
    }
    static getTextList = () => {
        const copyText = localStorage.getItem(Storage.COPY)
        if (copyText) return JSON.parse(copyText) as string[]
        else return []
    }

}