import {Button, Stack} from "react-bootstrap";
// @ts-ignore
import logo from "../../assets/easybid.logo.png"
import * as React from "react";
import {usePage} from "../../hook/utils/usePage";
import {ProductProvider} from "../../context/ProductProvider";
import {useAlert} from "../../hook/utils/useAlert";

export const Main = () => {
    const {toBid, toProduct} = usePage()
    const {showAlert} = useAlert()
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
                    <img width={200} style={{cursor: "pointer"}}
                         className='mx-auto' src={logo} alt="reload"/>
                </Stack>

                <Stack
                    className={"vh-100 d-flex justify-content-center align-items-center"}
                    style={{paddingBottom: "200px", width: "70vw"}}
                    gap={5}
                >
                    <Button
                        className={"w-100 py-3 fw-bold"}
                        variant={"dark"}
                        onClick={toProduct}
                    >재고 관리</Button>
                    <Button
                        className={"w-100 py-3 fw-bold"}
                        variant={"dark"}
                        onClick={() => {
                            showAlert("준비중입니다.").then()
                        }}
                    >회원 관리</Button>
                    <Button
                        className={"w-100 py-3 fw-bold"}
                        variant={"dark"}
                        onClick={toBid}
                    >경매 시작</Button>
                </Stack>
            </Stack>
        </Stack>
    )
}