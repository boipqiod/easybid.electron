import {Button, Modal, Stack} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import {BidItem} from "../../../../utils/tpye";
import {useBid} from "../../../../hook/useBid";

export const BidAddProductModal = () => {

    const {addItem, isAddProduct, setIsAddProduct } = useBid()

    const [item, setItem] = useState<BidItem>({
        amount: 0,
        name: "",
        price: 0,
        clients: [],
        saleAmount: 0,
        status: 0
    })

    useEffect(() => {
        if(isAddProduct){
            setItem({
                amount: 0,
                name: "",
                price: 0,
                clients: [],
                saleAmount: 0,
                status: 0
            })
        }
    }, [isAddProduct])

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement
        const value = target.value
        const id = target.id

        const _item = {...item}

        switch (id){
            case "name":
                _item.name = value
                break
            case "price":
                _item.price = parseInt(value)
                break
            case "amount":
                _item.amount = parseInt(value)
                break
        }

        setItem(_item)
    }

    const submit = () => {
        //필드 체크
        addItem(item).then()
    }

    const close = () => {
        //데이터 초기화
        setItem({
            amount: 0,
            name: "",
            price: 0,
            clients: [],
            saleAmount: 0,
            status: 0
        })

        setIsAddProduct(false)
    }

    return(
        <Modal
            centered
            show={isAddProduct}
            onHide={close}
        >
            <Modal.Header>
                <Modal.Title>상품 추가</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack
                    className={"mx-2"}
                >
                    <label htmlFor="name">상품 이름</label>
                    <Form.Control
                        id="name"
                        onChange={handleInput}
                        placeholder="상품 이름"
                        value={item.name}
                    />
                </Stack>

                <Stack
                    direction={"horizontal"}>
                    <Stack
                        className={"w-75 mx-2"}
                    >
                        <label htmlFor="price">개당 금액</label>
                        <Form.Control
                            type="number"
                            id="price"
                            onChange={handleInput}
                            placeholder="개당 금액"
                            min="1"
                            value={item.price === 0 ? "" : item.price}
                        />
                    </Stack>
                    <Stack
                        className={"w-25 mx-2"}
                    >
                        <label htmlFor="amount">판매 갯수</label>
                        <Form.Control
                            type="number"
                            id="amount"
                            onChange={handleInput}
                            placeholder="판매 갯수"
                            min="0"
                            value={item.amount === 0 ? "" : item.amount}
                        />
                    </Stack>
                </Stack>
            </Modal.Body>
            <Modal.Footer>
                <Stack direction={"horizontal"}>
                    <Button
                        onClick={submit}
                        className={"mx-2"}
                    > 추가
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