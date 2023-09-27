import {Button, ButtonGroup, Card, Stack, Table} from "react-bootstrap";

import * as React from "react";
import {useProduct} from "../../hook/useProduct";
import {AddProductModal} from "./Modal/AddProductModal";
import {useState} from "react";
import {ModifyProductModal} from "./Modal/ModifyProductModal";
import {IoIosArrowBack} from "react-icons/io";
import {usePage} from "../../hook/utils/usePage";

export const Products = () => {
    const {deleteProductData, productList} = useProduct();
    const {toMain} = usePage();

    const [showAddProductModal, setShowAddProductModal] = useState(false);
    const [modifyAmountIndex, setModifyAmountIndex] = useState(-1);

    const handleShowAddProductModal = () => {
        setShowAddProductModal(true);
    }

    const handleCloseAddProductModal = () => {
        setShowAddProductModal(false);
    }

    const handleModifyAmount = (id: string) => {
        const index = productList.findIndex((item) => item.id === id);
        setModifyAmountIndex(index);
    }

    const handleModifyAmountModalClose = () => {
        setModifyAmountIndex(-1);
    }

    const handleDeleteProduct = async (id: string) => {
        await deleteProductData(id);
    }

    return (
        <>
            {
                showAddProductModal &&
                <AddProductModal
                    show={showAddProductModal}
                    onHide={handleCloseAddProductModal}
                />
            }

            {
                modifyAmountIndex !== -1 &&
                <ModifyProductModal
                    show={modifyAmountIndex !== -1}
                    onHide={handleModifyAmountModalClose}
                    id={productList[modifyAmountIndex].id}
                />
            }
            <div className="container d-flex flex-column align-items-center vw-100">
                <div style={{width: "720px"}} className="d-flex flex-column justify-content-center text-center mb-5">
                    <Stack
                        gap={3}
                        className={"mt-5"}
                    >
                        <Stack
                            direction={"horizontal"}
                        >
                            <Button
                                variant="none"
                                className={"mx-2"}
                                onClick={toMain}
                            >
                                <IoIosArrowBack/> <span className={"fw-bold"}>뒤로</span>
                            </Button>
                        </Stack>

                        <Card
                            className={"my-5"}
                        >
                            <Card.Header>
                                <Stack
                                    direction={"horizontal"}
                                    className={"w-100 justify-content-between"}
                                >
                                    <Card.Title>재고 관리</Card.Title>
                                    <Stack
                                        direction={"horizontal"}
                                        gap={2}
                                    >
                                        <Button
                                            onClick={handleShowAddProductModal}
                                        >상품 추가</Button>
                                    </Stack>
                                </Stack>
                            </Card.Header>

                            <Card.Body>
                                <Table
                                    className={"w-100 text-center"}
                                >
                                    <thead>
                                    <tr>
                                        <th className={"col-1"}>#</th>
                                        <th className={"col-6"}>이름</th>
                                        <th className={"col-2"}>수량</th>
                                        <th className={"col-3"}>동작</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        productList &&
                                        productList.map((product, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{productList.length - index}</td>
                                                <td>{product.name}</td>
                                                <td>{product.amount}</td>
                                                <td>
                                                    <ButtonGroup
                                                        size={"sm"}
                                                    >
                                                        <Button
                                                            variant={"secondary"}
                                                            onClick={() => {
                                                                handleModifyAmount(product.id)
                                                            }}
                                                        >수정</Button>
                                                        <Button
                                                            variant={"danger"}
                                                            onClick={() => {
                                                                handleDeleteProduct(product.id).then()
                                                            }}
                                                        >삭제</Button>
                                                    </ButtonGroup>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>

                    </Stack>
                </div>
            </div>

        </>

    )
}