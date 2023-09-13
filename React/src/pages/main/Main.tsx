import {Button, Stack} from "react-bootstrap";
// @ts-ignore
import logo from "../../assets/easybid.logo.png"
import * as React from "react";
import {usePage} from "../../hook/utils/usePage";

export const Main = () => {

    const {toBid} = usePage()

    return (
        <Stack
            className={"mt-5 vw-100"}
        >
            <Stack
                className={"mx-auto"}
                style={{maxWidth: "720px"}}
                gap={3}
            >
                <Stack>
                    <img width={200} style={{cursor: "pointer"}} onClick={() => {
                        window.location.reload()
                    }} className='mx-auto' src={logo} alt="reload"/>
                </Stack>

                <Stack
                    className={"vh-100 d-flex justify-content-center align-items-center"}
                    style={{paddingBottom: "200px", width: "70vw"}}
                    gap={5}
                >
                    <Button
                        className={"w-100 py-3"}
                        variant={"secondary"}
                        onClick={toBid}

                    >재고 관리</Button>
                    <Button
                        className={"w-100 py-3"}
                        variant={"secondary"}
                    >회원 관리</Button>
                    <Button
                        className={"w-100 py-3"}
                        variant={"secondary"}
                        onClick={toBid}
                    >경매 시작 관리</Button>
                </Stack>
            </Stack>
        </Stack>
    )
}