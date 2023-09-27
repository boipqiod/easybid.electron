import {Button, Modal, Stack} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import React, {useState} from "react";
import {useProduct} from "../../../hook/useProduct";
type props = {
    show: boolean;
    onHide: () => void;
}

export const AddProductModal = (props: props) => {

    const [productName, setProductName] = useState("");
    const [productAmount, setProductAmount] = useState(0);
    const {addProductData} = useProduct()

    const handleProductName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductName(event.target.value);
    }

    const handleProductAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        if(value === ""){
            value = "0";
        }
        //제일 앞에 0이 있면 0 제거
        if(value[0] === "0"){
            value = value.slice(1);
        }
        //0보다 작으면  0으로 변경
        if(parseInt(value) < 0){
            value = "0";
        }
        setProductAmount(parseInt(value));
    }

    const handleAddProduct = async () => {
        await addProductData(productName, productAmount);
    }

    return (
        <Modal
            centered
            show={props.show}
            onHide={props.onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title>상품 추가</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack>
                    <Stack>
                        <label>상품명</label>
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
                    onClick={handleAddProduct}
                >
                    추가
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