import {Button, Modal, Stack} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import {BidItem} from "../../../../utils/tpye";
import {useBid} from "../../../../hook/useBid";
import {useProduct} from "../../../../hook/useProduct";
import Utils from "../../../../utils/Utils";

export const BidAddProductModal = () => {

    const {addItem, isAddProduct, setIsAddProduct} = useBid()
    const {productList, addProductData} = useProduct()
    const [productIndex, setProductIndex] = useState<number>(-1)

    const [item, setItem] = useState<BidItem>({
        amount: 0,
        name: "",
        price: 0,
        clients: [],
        saleAmount: 0,
        status: 0,
        productId: "",
        saleProductCount: 1
    })

    const baseItem: BidItem = {
        amount: 0,
        name: "",
        price: 0,
        clients: [],
        saleAmount: 0,
        status: 0,
        productId: "",
        saleProductCount: 1
    }

    useEffect(() => {
        if (isAddProduct) {
            setItem(Utils.copyObject(baseItem))
        }
    }, [isAddProduct])

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement
        const value = target.value
        const id = target.id

        const _item = {...item}

        switch (id) {
            case "name":
                _item.name = value
                break
            case "price":
                _item.price = parseInt(value)
                break
            case "amount":
                _item.amount = parseInt(value)
                break
            case "count":
                _item.saleProductCount = parseInt(value)
                break
        }

        setItem(_item)
    }

    const submit = async () => {
        //-2면 재고 상품 등록
        if (productIndex === -1) {
            const res = await addProductData(item.name, item.amount)
            if(res.success && res.item){
                const _item: BidItem = {
                    amount: item.amount,
                    name: item.name,
                    price: item.price,
                    clients: item.clients,
                    saleAmount: item.saleAmount,
                    status: item.status,
                    productId: res.item.id,
                    saleProductCount: item.saleProductCount
                }
                setItem(_item)
                addItem(_item).then()
            }
            return
        }
        //필드 체크
        addItem(item).then()
    }

    const close = () => {
        //데이터 초기화
        setItem(Utils.copyObject(baseItem))

        setIsAddProduct(false)
    }

    const handleProductInput = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const target = event.target as HTMLSelectElement
        const index = Number(target.value)

        setProductIndex(index)

        if (index === -1) {
            setItem(Utils.copyObject(baseItem))
            return
        }

        const _item: BidItem = {
            amount: item.amount,
            name: productList[index].name,
            price: item.price,
            clients: item.clients,
            saleAmount: item.saleAmount,
            status: item.status,
            productId: productList[index].id,
            saleProductCount: item.saleProductCount === 0 ? 1 : item.saleProductCount
        }

        setItem(_item)
    }

    return (
        <Modal
            centered
            show={isAddProduct}
            onHide={close}
        >
            <Modal.Header>
                <Modal.Title>상품 추가</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack>
                    <Stack
                        className={"w-100 mx-2"}
                    >
                        <label htmlFor="productId">상품 선택</label>
                        <Form.Select
                            id="productId"
                            onChange={handleProductInput}
                        >
                            <option value={-1}>새 상품 추가하기</option>
                            {productList.map((product, index) => {
                                return (
                                    <option
                                        key={index}
                                        value={index}
                                    >{product.name}</option>
                                )
                            })}
                        </Form.Select>
                    </Stack>
                    <Stack
                        direction={"horizontal"}>
                        <Stack
                            className={"w-75 mx-2"}
                        >
                            <label htmlFor="name">판매 이름</label>
                            <Form.Control
                                id="name"
                                onChange={handleInput}
                                placeholder="판매 이름"
                                value={item.name}
                            />
                        </Stack>
                        <Stack
                            className={"w-25 mx-2"}
                        >
                            <label htmlFor="name">소모 갯수</label>
                            <Form.Control
                                type="number"
                                min={1}
                                id="count"
                                onChange={handleInput}
                                placeholder=""
                                value={item.saleProductCount === 0 ? "" : item.saleProductCount}
                            />
                        </Stack>
                    </Stack>
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
                        <label htmlFor="amount">판매 가능 갯수</label>
                        <Form.Control
                            type="number"
                            id="amount"
                            onChange={handleInput}
                            placeholder="판매 가능 갯수"
                            min="0"
                            max={
                                item.productId === "" ?
                                    undefined :
                                    productList.find(product => product.id === item.productId)?.amount
                            }
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