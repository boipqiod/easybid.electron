import React, {useEffect, useState} from "react";
import {Button, Modal, Stack} from "react-bootstrap";
import {Client} from "../../../../utils/tpye";
import Form from "react-bootstrap/Form";
import {useBid} from "../../../../hook/common/useBid";

export const BidAddClientModal = () => {
    const {bidItems, addClientIndex, setAddClientIndex, addClient} = useBid()
    const [client, setClient] = useState<Client>({name: "", amount: 1, note: ""})

    useEffect(() => {
        if (addClientIndex !== -1) {
            setClient({name: "", amount: 1, note: ""})
        }
    }, [addClientIndex])

    const submit = async () => {
        await addClient(client)
    }
    const close = () => {
        setAddClientIndex(-1)
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setClient({...client, [e.target.name]: e.target.value})
    }

    return (
        <Modal
            onHide={close}
            show={addClientIndex !== -1}
            centered
            style={{backgroundColor: "rgba(0,0,0,0.41)", top: 0, left: 0}}>
            <Modal.Header>
                <Modal.Title>
                    {`[${addClientIndex === -1 ? "" : bidItems[addClientIndex].name}] 상품에 구매자 추가하기`}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Stack
                    className={"mx-auto"}
                    direction={"horizontal"}>
                    <Stack
                        className={"mx-2"}
                    >
                        <Form.Label
                            className={"text-center"}
                        >
                            구매자 아이디
                        </Form.Label>
                        <Form.Control
                            placeholder={"이름"}
                            name={"name"}
                            onChange={handleChange}
                        />
                    </Stack>
                    <Stack
                        className={"mx-2"}
                    >
                        <Form.Label
                            className={"text-center"}
                        >
                            구매 수량
                        </Form.Label>
                        <Form.Control
                            type={"number"}
                            name={"amount"}
                            min={1}
                            onChange={handleChange}
                        />
                    </Stack>
                    <Stack
                        className={"mx-2"}
                    >
                        <Form.Label
                            className={"text-center"}
                        >
                            비고
                        </Form.Label>
                        <Form.Control
                            name={"note"}
                            onChange={handleChange}
                        />
                    </Stack>
                </Stack>
            </Modal.Body>
            <Modal.Footer>
                <Stack direction={"horizontal"}>
                    <Button
                        onClick={submit}
                        className={"mx-2"}>
                        저장</Button>
                    <Button
                        onClick={close}
                        variant={"danger"}
                        className={"mx-2"}>
                        취소</Button>
                </Stack>
            </Modal.Footer>

        </Modal>
    )
}