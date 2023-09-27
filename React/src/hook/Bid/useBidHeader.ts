import {useBid} from "../common/useBid";
import {useSetting} from "../useSetting";
import StorageUtil from "../../utils/StorageUtil";
import React, {useState} from "react";
import {useAlert} from "../utils/useAlert";

export const useBidHeader = () => {
    const {initBid} = useBid()
    const {showAlert} = useAlert()

    const {setting, openSetting} = useSetting()

    const fileName = StorageUtil.getFileName() ?? ""
    const url = StorageUtil.getYoutubeUrl() ?? ""

    const [isEdit, setIsEdit] = useState<boolean>(fileName === "")
    const [from, setFrom] = useState({
        fileName: fileName,
        url: url
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFrom({...from, [name]: value})
    }

    const edit = async () => {
        if(!isEdit) {
            setIsEdit(true)
            return
        }

        setIsEdit(false)
        const success = await initBid(from.fileName, from.url)
        setIsEdit(!success)
    }


    return {
        isEdit, handleChange, edit, setting, openSetting,
        from
    }
}