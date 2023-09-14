import * as React from 'react';
import {useBid} from "../../../hook/useBid";
import {ChangeEventHandler, useState} from "react";
import StorageUtil from "../../../utils/StorageUtil";
import {IoSettingsOutline} from "react-icons/io5";
import {useSetting} from "../../../hook/useSetting";
// @ts-ignore
import logo from "../../../assets/easybid.logo.png"
import {Button, Stack} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import {BidDisplaySetting} from "./Modals/BidDisplaySetting";
import {usePage} from "../../../hook/utils/usePage";
import {IoIosArrowBack} from "react-icons/io";


export const BidHeader = () => {
    const {initBid} = useBid()

    const {toMain,} = usePage()
    const {setting, openSetting} = useSetting()

    const fileName = StorageUtil.getFileName() ?? ""
    const url = StorageUtil.getYoutubeUrl() ?? ""

    const [isEdit, setIsEdit] = useState<boolean>(fileName === "")
    const [bidName, setBidName] = useState<string>(fileName)
    const [youtubeUrl, setYoutubeUrl] = useState<string>(url)

    const handleChangeFileName: ChangeEventHandler<HTMLInputElement> = (event) => {
        setBidName(event.target.value.toLowerCase().replaceAll(" ",""))
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
            <Stack
                direction={"horizontal"}
            >
                <Button
                    variant="none"
                    className={"mx-2"}
                    onClick={toMain}
                >
                    <IoIosArrowBack/> <span className={"fw-bold"}>뒤로</span>
                </Button>
                <img width={200} style={{cursor: "pointer"}} onClick={() => {
                    window.location.reload()
                }} className='mx-auto' src={logo} alt="reload"/>
                <Button
                    variant="outline-primary"
                    className={"mx-2"}
                    onClick={openSetting}
                >
                    <IoSettingsOutline/> 설정
                </Button>
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
                        onClick={isEdit ? edit : () => {
                            setIsEdit(true)
                        }}
                        id="button_reload"
                        className="mx-2"
                    >{isEdit ? "저장" : "변경"}</Button>
                </Stack>
            </Stack>
            <BidDisplaySetting
                isShow={setting}
                close={openSetting}
            />
        </Stack>
    )
}
