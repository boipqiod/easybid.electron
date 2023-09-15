import React, {ChangeEventHandler, useEffect, useState} from "react";
import {useBid} from "../../../../hook/useBid";
import {BidItem, Client} from "../../../../utils/tpye";
import {Button, Modal, Stack, Table} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Utils from "../../../../utils/Utils";
import {useProduct} from "../../../../hook/useProduct";

export const BidModifyModal = () => {

    const {modifyIndex, bidItems, setModifyIndex, modifyItem} = useBid()
    const {productList} = useProduct()
    const [item, setItem] = useState<BidItem>(Utils.copyObject(bidItems[0]))

    useEffect(() => {
        if (modifyIndex !== -1) {
            setItem(Utils.copyObject(bidItems[modifyIndex]))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modifyIndex])

    const onChangeProduct: ChangeEventHandler<HTMLInputElement> = (e) => {
        const element = e.target as HTMLInputElement
        const id = element.id
        const value = element.value

        const _item = {...item}

        switch (id) {
            case "name":
                _item.name = value
                break
            case "price":
                _item.price = parseInt(value === "" ? "0" : value)
                break
            case "amount":
                _item.amount = parseInt(value)
                break
        }
        setItem(_item)
    }

    const handelChangeClient = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement
        const value = target.value
        const id = target.id
        const index = parseInt(id.split("_")[2])
        const _item = {...item}

        switch (id) {
            case `client_name_${index}`:
                _item.clients[index].name = value
                break
            case `client_amount_${index}`:
                _item.clients[index].amount = parseInt(value)
                break
            case `client_note_${index}`:
                _item.clients[index].note = value
                break
        }
        setItem(_item)
    }

    const removeItem = (index: number) => {
        const _item = {...item}
        _item.clients.splice(index, 1)
        setItem(_item)
    }

    const close = () => {
        setModifyIndex(-1)
    }

    const clientTable = (index: number, client: Client) => {
        return (
            <tr key={index}>
                <td>
                    <Form.Control
                        size={"sm"}
                        type="text"
                        id={`client_name_${index}`}
                        onChange={handelChangeClient}
                        placeholder="이름"
                        value={client.name}
                    />
                </td>
                <td>
                    <Form.Control
                        size={"sm"}
                        type="number"
                        id={`client_amount_${index}`}
                        onChange={handelChangeClient}
                        placeholder="수량"
                        min={1}
                        value={client.amount}
                    />
                </td>
                <td>
                    <Form.Control
                        size={"sm"}
                        type="text"
                        id={`client_note_${index}`}
                        onChange={handelChangeClient}
                        placeholder="비고"
                        value={client.note}
                    />
                </td>
                <td>
                    <Button
                        size={"sm"}
                        variant={"danger"}
                        onClick={() => {
                            removeItem(index)
                        }}
                    >
                        삭제
                    </Button>
                </td>
            </tr>
        )
    }

    const addClient = () => {
        const _item = {...item}
        _item.clients.push({
            amount: 1,
            name: "",
            note: ""
        })
        setItem(_item)
    }

    const submit = () => {
        modifyItem(item).then()
    }

    const handleChangeItem = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedItemName = event.target.value;

        // 선택된 아이템의 이름으로 원본 배열에서 인덱스 찾기
        const index = bidItems.findIndex(item => item.name === selectedItemName);

        // 해당 인덱스를 상태에 저장
        if (index !== -1) {
            setModifyIndex(index);
            event.target.value = "";
        }
    }

    return (
        <Modal
            centered
            show={modifyIndex !== -1}
            onHide={close}
        >
            <Modal.Header>
                <Modal.Title>상품 정보 수정</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Stack
                    gap={4}
                >
                    <Form.Control
                        list={"itemList"}
                        placeholder={"상품 검색"}
                        onChange={handleChangeItem}
                    >
                    </Form.Control>
                    <datalist id={"itemList"}>
                        {
                            bidItems.map((value, index) => {
                                return (
                                    <option
                                        key={index}
                                        data-index={index}
                                        value={value.name}
                                    />
                                )
                            })
                        }
                    </datalist>

                    <Stack
                        gap={1}
                    >
                        <h5>기본 정보</h5>
                        <Stack
                            direction={"horizontal"}
                        >
                            <Stack
                                className={"w-100 mx-2"}
                            >
                                <label htmlFor="name">판매 이름</label>
                                <Form.Control
                                    id="name"
                                    onChange={onChangeProduct}
                                    placeholder="상품 이름"
                                    value={item.name}
                                />
                            </Stack>
                            <Stack>
                                <label htmlFor="price">재고 상품</label>
                                <Form.Control
                                    disabled
                                    value={productList.find(product => product.id === item.productId)?.name || ""}
                                />
                            </Stack>

                        </Stack>

                        <Stack direction={"horizontal"}>
                            <Stack
                                className={"w-100 mx-2"}
                            >
                                <label htmlFor="price">개당 금액</label>
                                <Form.Control
                                    type="number"
                                    id="price"
                                    onChange={onChangeProduct}
                                    placeholder="개당 금액"
                                    min="1"
                                    value={item.price === 0 ? "" : item.price}
                                />
                            </Stack>
                            <Stack>
                                <label htmlFor="amount">판매 갯수</label>
                                <Form.Control
                                    type="number"
                                    id="amount"
                                    onChange={onChangeProduct}
                                    placeholder="판매 갯수"
                                    min="0"
                                    value={item.amount === 0 ? "" : item.amount}
                                />
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack>
                        <h5>구매자 정보</h5>
                        <Stack>
                            <Table>
                                <thead>
                                <tr>
                                    <th className={"col-5"}>이름</th>
                                    <th className={"col-2"}>수량</th>
                                    <th className={"col-3"}>비고</th>
                                    <th className={"col-2"}>삭제</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    modifyIndex !== -1 && item.clients.map((value, index) => {
                                        return clientTable(index, value)
                                    })
                                }
                                <tr>
                                    <td colSpan={4}>
                                        <Button
                                            size={"sm"}
                                            className={"w-100"}
                                            onClick={addClient}
                                            variant={"success"}
                                        >추가하기</Button>
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                        </Stack>
                    </Stack>
                </Stack>

            </Modal.Body>

            <Modal.Footer>
                <Stack direction={"horizontal"}>
                    <Button
                        onClick={submit}
                        className={"mx-2"}
                    > 적용
                    </Button>
                    <Button
                        onClick={close}
                        variant={"danger"}
                        className={"mx-2"}
                    >취소
                    </Button>
                </Stack>
            </Modal.Footer>
        </Modal>
    )
}