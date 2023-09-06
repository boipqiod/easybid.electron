import React from "react";
import {useBid} from "../../../../hook/useBid";
import {MainTableItem} from "./MainTableItem";
import {Button, Card, Table} from "react-bootstrap";

export const MainTable: React.FC = () => {
    const {bidItems, setIsAddProduct} = useBid()

    return (
        <Card className="w-100 m-1">
            <Card.Header>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div></div>
                    <Card.Title>상품</Card.Title>
                    <Button
                        variant="success"
                        onClick={() => {
                            setIsAddProduct(true)
                        }}
                    >상품 추가
                    </Button>
                </div>
            </Card.Header>
            <div className="card-body">
                <Table>
                    <thead>
                    <tr>
                        <td className={"col-1"}>No.</td>
                        <td className={"col-4"}>상품 이름</td>
                        <td className={"col-2"}>금액</td>
                        <td className={"col-1"}>수량</td>
                        <td className={"col-5"}>동작</td>
                    </tr>
                    </thead>
                    <tbody id="tbody">
                    {bidItems.length > 0 ? <>{
                        bidItems.map((value, index) => {
                            return (
                                <MainTableItem
                                    key={index}
                                    index={index}
                                    name={value.name}
                                    price={value.price}
                                    amount={value.amount}
                                    status={value.status}
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
