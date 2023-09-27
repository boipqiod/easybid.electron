import {Button, Modal, Stack} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import {BidItem} from "../../../../utils/tpye";
import {useProduct} from "../../../../hook/useProduct";
import Utils from "../../../../utils/Utils";
import {useBid} from "../../../../hook/common/useBid";

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

export const BidAddProductModal = () => {
    const {addItem, isAddProduct, setIsAddProduct} = useBid()
    const {productList, addProductData} = useProduct()

    //선택된 상품 인덱스
    const [productIndex, setProductIndex] = useState<number>(-1)
    //추가할 아이템 정보
    const [item, setItem] = useState<BidItem>(Utils.copyObject(baseItem))
    const product = productIndex > -1 ? productList[productIndex] : {name: "새 상품 추가", amount: 0}

    useEffect(() => {
        if (isAddProduct) {
            setItem(Utils.copyObject(baseItem))
        }
    }, [isAddProduct])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setItem({
            ...item,
            [event.target.name]: event.target.value
        })
    }

    const submit = async () => {
        if (productIndex > -1) {
            await addItem(item)
        }else {
            //-1이면 새로운 상품 추가
            const res = await addProductData(item.name, item.amount)
            if(res.success && res.item){
                const _item: BidItem = {
                    ...item,
                    productId: res.item.id
                }
                await addItem(_item)
            }
        }
        setProductIndex(-1)
        setItem(Utils.copyObject(baseItem))
    }

    const close = () => {
        //데이터 초기화
        setItem(Utils.copyObject(baseItem))
        setIsAddProduct(false)
    }

    const handleProductInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement
        const selectedValue = target.value;
        const index = productList.findIndex(product => product.name === selectedValue)

        console.log(selectedValue, index)

        if(index === -1){
            setProductIndex(-1)
            return
        }

        const _item: BidItem = {
            ...baseItem,
            productId: productList[index].id,
            name: productList[index].name,
        }

        setProductIndex(index)
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
                        <Form.Control
                            id="productId"
                            onInput={handleProductInput}
                            list={"productItems"}
                            placeholder="상품 선택"
                            defaultValue={product.name}
                        >
                        </Form.Control>
                        <datalist id="productItems">
                            <option
                                value={"새 상품 추가"}
                            >새 상품 추가</option>
                            {productList.map((product, index) => {
                                return (
                                    <option
                                        key={index}
                                        value={product.name}
                                    >{product.name}</option>
                                )
                            })}
                        </datalist>
                    </Stack>
                    <Stack
                        direction={"horizontal"}>
                        <Stack
                            className={"w-75 mx-2"}
                        >
                            <label htmlFor="name">판매 이름</label>
                            <Form.Control
                                name={"name"}
                                onChange={handleInputChange}
                                placeholder="판매 이름"
                                value={item.name}
                            />
                        </Stack>
                        <Stack
                            className={"w-25 mx-2"}
                        >
                            <label htmlFor="name">소모 갯수</label>
                            <Form.Control
                                type={"number"}
                                min={1}
                                name={"saleProductCount"}
                                onChange={handleInputChange}
                                placeholder="소모 갯수"
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
                            type={"number"}
                            name={"price"}
                            onChange={handleInputChange}
                            placeholder={"개당 금액"}
                            min={1}
                            value={item.price === 0 ? "" : item.price}
                        />
                    </Stack>
                    <Stack
                        className={"w-25 mx-2"}
                    >
                        <label htmlFor="amount">판매 가능 갯수</label>
                        <Form.Control
                            type={"number"}
                            name={"amount"}
                            onChange={handleInputChange}
                            placeholder={"판매 가능 갯수"}
                            min={0}
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