import React, {useState} from "react";
import {Button, Modal, Stack} from "react-bootstrap";
import {useBid} from "../../../../hook/useBid";
import {Client} from "../../../../utils/tpye";
import Form from "react-bootstrap/Form";

export const MainAddClientModal: React.FC = () => {
    const {bidItems, addClientIndex, setAddClientIndex, addClient} = useBid()
    const [client, setClient] = useState<Client>({name: "", amount: 1})

    const submit = async () => {
        await addClient(client)
    }
    const close = () => {
        setAddClientIndex(-1)
    }

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const _client = {...client}
        _client.name = event.target.value
        setClient(_client)
    }
    const handleChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
        const _client = {...client}
        _client.amount = parseInt(event.target.value)
        setClient(_client)
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
                            onChange={handleChangeName}
                            value={client.name}
                        />
                    </Stack>
                    <Stack
                        className={"mx-2"}
                    >
                        <Form.Label
                            className={"text-center"}
                        >
                            이름
                        </Form.Label>
                        <Form.Control
                            type={"number"}
                            min={1}
                            onChange={handleChangeAmount}
                            value={client.amount === 0 ? "" : client.amount}
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