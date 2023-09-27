import React from "react";
import {BidTableItem} from "./BidTableItem";
import {Button, Card, Stack, Table} from "react-bootstrap";
import {useBid} from "../../../../hook/common/useBid";

type props = {

}

export const BidTable = () => {
    const {bidItems, setIsAddProduct} = useBid()

    return (
        <Card className="w-100 m-1">
            <Card.Header>

                <Stack
                    direction={"horizontal"}
                    className={"w-100 justify-content-between"}
                >
                    <Card.Title>상품</Card.Title>

                    <Button
                        variant="success"
                        onClick={() => {setIsAddProduct(true)}}
                    >상품 추가
                    </Button>
                </Stack>

            </Card.Header>
            <div className="card-body">
                <Table>
                    <thead>
                    <tr>
                        <td className={"col-1"}>No.</td>
                        <td className={"col-4"}>상품 이름</td>
                        <td className={"col-2"}>금액</td>
                        <td className={"col"}>수량</td>
                        <td className={"col-4"}>동작</td>
                    </tr>
                    </thead>
                    <tbody id="tbody">
                    {bidItems.length > 0 ? <>{
                        bidItems.map((value, index) => {
                            return (
                                <BidTableItem
                                    key={index}
                                    index={index}
                                    name={value.name}
                                    price={value.price}
                                    amount={value.amount}
                                    status={value.status}
                                    productId={value.productId}
                                />
                            )
                        })
                    }</> : <tr>
                        <td colSpan={8}><p className='text-center mt-2'>등록된 상품이 없습니다!</p></td>
                    </tr>}
                    </tbody>
                </Table>
            </div>
        </Card>

    )
}
