import {Button, Modal, Stack} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import React, {useEffect, useState} from "react";
import {useProduct} from "../../../hook/useProduct";
import {ProductItem} from "../../../utils/tpye";
import Utils from "../../../utils/Utils";
type props = {
    show: boolean;
    onHide: () => void;
    id: string;
}

export const ModifyProductModal = (props: props) => {

    const {modifyProductData, productList} = useProduct()
    const index = productList.findIndex((item) => item.id === props.id)

    const [productName, setProductName] = useState(Utils.copyObject(productList[index].name))
    const [productAmount, setProductAmount] = useState(0);
    const [item, setItem] = useState<ProductItem>(Utils.copyObject(productList[index]))


    useEffect(() => {
        if(index === -1){
            return;
        }
        setItem(productList[index])
        setProductAmount(productList[index].amount)

        // eslint-disable-next-line
    }, [index])

    const handleProductName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductName(event.target.value);
    }

    const handleProductAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        if(value === ""){
            value = "0";
        }
        //제일 앞에 0이 있면 0 제거
        else if(value[0] === "0"){
            value = value.slice(1);
        }
        //0보다 작으면  0으로 변경
        else if(parseInt(value) < 0){
            value = "0";
        }
        setProductAmount(parseInt(value));
    }

    const handleModifyAmount = async () => {
        const res = await modifyProductData({
            ...item,
            name: productName,
            amount: productAmount
        })
        if (res) props.onHide()

    }

    return (
        <Modal
            centered
            show={props.show}
            onHide={props.onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title>수량 변경</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack>
                    <Stack>
                        <label>상품 이름</label>
                        <Form.Control
                            value={productName}
                            onChange={handleProductName}
                        />
                    </Stack>
                    <Stack>
                        <label>상품 수량</label>
                        <Form.Control
                            type={"number"}
                            min={0}
                            value={productAmount === 0 ? "" : productAmount}
                            onChange={handleProductAmount}
                        />
                    </Stack>
                </Stack>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={handleModifyAmount}
                >
                    저장
                </Button>
                <Button
                    variant={"danger"}
                    onClick={props.onHide}
                >
                    취소
                </Button>
            </Modal.Footer>
        </Modal>
    )
}