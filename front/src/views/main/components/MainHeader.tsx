import * as React from 'react';
import logo from '../../../assets/easybid.logo.png'
import {useBid} from "../../../hook/useBid";
import {ChangeEventHandler, useState} from "react";
import Storage from "../../../Utils/Storage";
import { IoSettingsOutline } from "react-icons/io5";
import {useSetting} from "../../../hook/useSetting";

export const MainHeader: React.FC = () => {
    const {initBid} = useBid()

    const {openSetting} = useSetting()

    const fileName = Storage.getFileName() ?? ""
    const url = Storage.getYoutubeUrl() ?? ""

    const [isEdit, setIsEdit] = useState<boolean>(fileName === "")
    const [bidName, setBidName] = useState<string>(fileName)
    const [youtubeUrl, setYoutubeUrl] = useState<string>(url)

    const onChangeFileName: ChangeEventHandler<HTMLInputElement> = (event) => {
        setBidName(event.target.value)
    }
    const onChangeUrl: ChangeEventHandler<HTMLInputElement> = (event) => {
        setYoutubeUrl(event.target.value)
    }

    const edit = async () => {
        setIsEdit(false)
        const success = await initBid(bidName, youtubeUrl)
        setIsEdit(!success)
    }

    return (
        <>
            <div>
                <img style={{cursor: "pointer"}} onClick={() => {
                    window.location.reload()
                }} className='mt-5' src={logo} alt="reload"/>
            </div>

            <div className="row m-3 align-items-center">
                <div className="col-11 row p-0">
                    <div className="row mb-1">
                        <input
                            id="input_name"
                            className="input-group-sm input-group-tex"
                            placeholder="유튜브 채팅 URL"
                            onChange={onChangeUrl}
                            disabled={!isEdit}
                            value={youtubeUrl}
                        />
                    </div>
                    <div className="row">
                        <input
                            id="input_name"
                            className="input-group-sm input-group-tex col-10"
                            placeholder="경매 이름"
                            onChange={onChangeFileName}
                            disabled={!isEdit}
                            value={bidName}
                        />
                        {
                            isEdit ?
                                <button
                                    onClick={edit}
                                    id="button_reload"
                                    className="col btn btn-sm btn-info mx-2"
                                >저장</button> :
                                <button
                                    onClick={() => {
                                        setIsEdit(true)
                                    }}
                                    id="button_reload"
                                    className="col btn btn-sm btn-info mx-2"
                                >변경</button>
                        }
                    </div>
                </div>
                <div className="col h-100 align-items-center justify-content-center p-0">
                    <button
                        className="btn btn-sm btn-outline-primary m-0"
                        onClick={openSetting}
                    >
                        <IoSettingsOutline /> 설정
                    </button>
                </div>
            </div>


        </>)
}
