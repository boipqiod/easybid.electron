import {DisplaySetting} from "./tpye";

export default class StorageUtil {

    private static FILENAME = "fileName"
    private static YOUTUBE_URL = "youtubeUrl"
    private static ID = "ebId"
    private static TOKEN = "token"
    private static SETTING = "setting"
    private static COPY = "copy"

    static getFileName = () => {
        return localStorage.getItem(StorageUtil.FILENAME)
    }
    static saveFileName = (name: string) => {
        localStorage.setItem(StorageUtil.FILENAME, name)
    }
    static getYoutubeUrl = () => {
        return localStorage.getItem(StorageUtil.YOUTUBE_URL)
    }
    static saveYoutubeUrl = (url: string) => {
        localStorage.setItem(StorageUtil.YOUTUBE_URL, url)
    }
    static getEbId = (): string => {
        return localStorage.getItem(StorageUtil.ID) ?? ""
    }
    static saveEbId = (id: string) => {
        localStorage.setItem(StorageUtil.ID, id)
    }

    static saveToken = (token: string) => {
        localStorage.setItem(StorageUtil.TOKEN, token)
    }
    static getToken = (): string => {
        return localStorage.getItem(StorageUtil.TOKEN) ?? ""
    }

    static getSetting = () => {
        const setting = localStorage.getItem(StorageUtil.SETTING)
        if (setting) return JSON.parse(setting) as DisplaySetting
        else return null
    }
    static saveSetting = (setting: DisplaySetting) => {
        localStorage.setItem(StorageUtil.SETTING, JSON.stringify(setting))
    }

    static saveTextList = (copyText: string[]) => {
        localStorage.setItem(StorageUtil.COPY, JSON.stringify(copyText))
    }
    static getTextList = () => {
        const copyText = localStorage.getItem(StorageUtil.COPY)
        if (copyText) return JSON.parse(copyText) as string[]
        else return []
    }

}