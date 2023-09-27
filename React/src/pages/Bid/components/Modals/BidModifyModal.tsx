import React, {ChangeEventHandler, useEffect, useState} from "react";
import {BidItem, Client} from "../../../../utils/tpye";
import {Button, Modal, Stack, Table} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Utils from "../../../../utils/Utils";
import {useProduct} from "../../../../hook/useProduct";
import {useBid} from "../../../../hook/common/useBid";

export const BidModifyModal = () => {

    const {modifyIndex, bidItems, setModifyIndex, modifyItem} = useBid()
    const {productList} = useProduct()
    const [item, setItem] = useState<BidItem>(Utils.copyObject(bidItems[0]))

    useEffect(() => {
        if (modifyIndex !== -1) {
            setItem(Utils.copyObject(bidItems[modifyIndex]))
        }
    }, [bidItems, modifyIndex])

    const onChangeProduct: ChangeEventHandler<HTMLInputElement> = (e) => {
        setItem({
            ...item,
            [e.target.name]: e.target.value
        })
    }

    const handelChangeClient = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        const index = parseInt(event.target.id)

        setItem({
            ...item,
            clients : {
                ...item.clients,
                [index]: {
                    ...item.clients[index],
                    [event.target.name]: value
                }
            }
        })
    }

    const removeItem = (index: number) => {
        setItem({
            ...item,
            clients: item.clients.filter((_, i) => i !== index)
        })
    }

    const close = () => {
        setModifyIndex(-1)
    }

    const clientTable = (index: number, client: Client) => {
        return (
            <tr>
                <td>
                    <Form.Control
                        size={"sm"}
                        type="text"
                        id={index.toString()}
                        name={`name`}
                        onChange={handelChangeClient}
                        placeholder="이름"
                    />
                </td>
                <td>
                    <Form.Control
                        size={"sm"}
                        type="number"
                        id={index.toString()}
                        name={`amount`}
                        onChange={handelChangeClient}
                        placeholder="수량"
                        min={1}
                    />
                </td>
                <td>
                    <Form.Control
                        size={"sm"}
                        type="text"
                        id={index.toString()}
                        name={`note`}
                        onChange={handelChangeClient}
                        placeholder="비고"
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
                            className={"w-100 mx-2"}
                        >
                            <label htmlFor="price">재고 상품</label>
                            <Form.Control
                                disabled
                                value={productList.find(product => product.id === item.productId)?.name || ""}
                            />
                        </Stack>

                        <Stack
                            direction={"horizontal"}
                        >
                            <Stack
                                className={"w-100 mx-2"}
                            >
                                <label htmlFor="name">판매 이름</label>
                                <Form.Control
                                    name="name"
                                    onChange={onChangeProduct}
                                    placeholder="상품 이름"
                                    value={item.name}
                                />
                            </Stack>
                            <Stack
                            >
                                <label htmlFor="name">소모 갯수</label>
                                <Form.Control
                                    type="number"
                                    min={1}
                                    name="count"
                                    onChange={onChangeProduct}
                                    placeholder="소모 갯수"
                                    value={item.saleProductCount === 0 ? "" : item.saleProductCount}
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
                                    name="price"
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
                                    name="amount"
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