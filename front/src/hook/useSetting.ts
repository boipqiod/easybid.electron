import {BidContext} from "../context/BidProvider";
import {useContext} from "react";

export const useSetting = () => {
    const context = useContext(BidContext)!
    const {setting, setSetting} = context

    const openSetting = () => {
        setting ? setSetting(false) : setSetting(true)
    }

    return {
        setting, setSetting,
        openSetting
    }

}
