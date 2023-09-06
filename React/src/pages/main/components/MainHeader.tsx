import * as React from 'react';
import {useBid} from "../../../hook/useBid";
import {ChangeEventHandler, useState} from "react";
import StorageUtil from "../../../utils/StorageUtil";
import { IoSettingsOutline } from "react-icons/io5";
import {useSetting} from "../../../hook/useSetting";
// @ts-ignore
import logo from "../../../assets/easybid.logo.png"
import {Button, Stack} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import {MainDisplaySetting} from "./Modals/MainDisplaySetting";


export const MainHeader: React.FC = () => {
    const {initBid} = useBid()

    const {setting, openSetting } = useSetting()

    const fileName = StorageUtil.getFileName() ?? ""
    const url = StorageUtil.getYoutubeUrl() ?? ""

    const [isEdit, setIsEdit] = useState<boolean>(fileName === "")
    const [bidName, setBidName] = useState<string>(fileName)
    const [youtubeUrl, setYoutubeUrl] = useState<string>(url)

    const handleChangeFileName: ChangeEventHandler<HTMLInputElement> = (event) => {
        setBidName(event.target.value)
    }
    const handleChangeUrl: ChangeEventHandler<HTMLInputElement> = (event) => {
        setYoutubeUrl(event.target.value)
    }

    const edit = async () => {
        setIsEdit(false)
        const success = await initBid(bidName, youtubeUrl)
        setIsEdit(!success)
    }

    return (
        <Stack
            gap={3}
            className={"mt-5"}
        >
            <Stack>
                <img width={200} style={{cursor: "pointer"}} onClick={() => {
                    window.location.reload()
                }} className='mx-auto' src={logo} alt="reload"/>
            </Stack>

            <Stack
                gap={2}
            >
                <Stack
                    direction={"horizontal"}
                    className={"w-100"}
                >
                    <Form.Control
                        id="input_name"
                        className="mx-2"
                        placeholder="유튜브 채팅 URL"
                        onChange={handleChangeUrl}
                        disabled={!isEdit}
                        value={youtubeUrl}
                    />
                    <Button
                        variant="outline-primary"
                        className="mx-2"
                        style={{width: "100px"}}
                        onClick={openSetting}
                    >
                        <IoSettingsOutline /> 설정
                    </Button>
                </Stack>

                <Stack
                    direction={"horizontal"}
                    className={"w-100"}
                >
                    <Form.Control
                        id="input_name"
                        className="mx-2"
                        placeholder="경매 이름"
                        onChange={handleChangeFileName}
                        disabled={!isEdit}
                        value={bidName}
                    />
                    <Button
                        variant="info"
                        style={{width: "200px"}}
                        onClick={isEdit ? edit : () => {setIsEdit(true)} }
                        id="button_reload"
                        className="mx-2"
                    >{ isEdit ? "저장" : "변경" }</Button>
                </Stack>
            </Stack>
            <MainDisplaySetting
                isShow={setting}
                close={openSetting}
            />
        </Stack>
    )
}
