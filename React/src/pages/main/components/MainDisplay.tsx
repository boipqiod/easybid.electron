import React from "react";
import {useBid} from "../../../hook/useBid";
import {Button, Card, Stack} from "react-bootstrap";

export const MainDisplay: React.FC = () => {
    const {onSaleIndex, bidItems} = useBid()

    return (
        <Stack
            gap={3}
            className={"mt-4"}
        >
            <Stack
                direction={"horizontal"}
            >
                <Button
                    variant={"secondary"}
                    className="w-100 mx-2"
                    href="/display"
                    target="_blank"
                >판매 정보 열기</Button>

                <Button
                    variant={"secondary"}
                    className="w-100 mx-2"
                    href="/chat"
                    target="_blank"
                >채팅 정보 열기</Button>
            </Stack>


            <Card className="card w-100 m-1">
                <Card.Header>
                    <Card.Title>
                        판매중인 상품
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <p>상품명 : {onSaleIndex ? "-" : bidItems[onSaleIndex].name}</p>
                    <p>구매 갯수 : {onSaleIndex ? "-" : bidItems[onSaleIndex].saleAmount}</p>
                    <p>남은 갯수 : {onSaleIndex ? "-" :  bidItems[onSaleIndex].amount === 0 ? "-" : bidItems[onSaleIndex].amount - bidItems[onSaleIndex].saleAmount}</p>
                </Card.Body>
            </Card>
        </Stack>
    )
}
