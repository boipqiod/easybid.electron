import * as React from 'react';
import {IoSettingsOutline} from "react-icons/io5";
import {Button, Image, Stack} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import {BidDisplaySetting} from "./Modals/BidDisplaySetting";
import {usePage} from "../../../hook/utils/usePage";
import {IoIosArrowBack} from "react-icons/io";
import {useBidHeader} from "../../../hook/Bid/useBidHeader";
// @ts-ignore
import logo from "../../../assets/easybid.logo.png"


export const BidHeader = () => {
    const {toMain} = usePage()
    const {
        setting, openSetting,
        handleChange, isEdit,edit,
        from
    } = useBidHeader()

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
                <Image width={200} style={{cursor: "pointer"}} onClick={() => {
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
                        onChange={handleChange}
                        disabled={!isEdit}
                        value={from.url}
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
                        onChange={handleChange}
                        disabled={!isEdit}
                        value={from.fileName}
                    />
                    <Button
                        variant="info"
                        style={{width: "200px"}}
                        onClick={edit}
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
