import React from "react";
import {useBid} from "../../../../hook/useBid";
import Utils from "../../../../utils/Utils";
import {BidStatus} from "../../../../utils/tpye";
import {Button, ButtonGroup} from "react-bootstrap";

interface MainTableItemProps {
    index: number
    name: string
    price: number
    amount: number
    status: BidStatus
}

export const BidTableItem= ({index, name, price, amount, status}: MainTableItemProps) => {

    const {startBid, endBid, restartBid, removeItem, setModifyIndex, setAddClientIndex} = useBid()

    return (
        <tr>
            <td>{index}</td>
            <td>{name}</td>
            <td>{Utils.formatCurrency(price)}</td>
            <td>{amount}</td>
            <td style={{textAlign: "right"}}>
                <ButtonGroup
                    size={"sm"}
                    style={{
                        border: "1px solid #d9d9d9",
                    }}
                >
                    <Button
                        variant={
                        status === BidStatus.ready ? "success" :
                            status === BidStatus.sale ? "info" : "dark"}
                        onClick={()=>{
                            switch (status) {
                                case BidStatus.ready:
                                    startBid(index).then()
                                    break
                                case BidStatus.sale:
                                    endBid(index).then()
                                    break
                                case BidStatus.end:
                                    restartBid(index).then()
                                    break
                            }
                        }}
                    >
                        {
                            status === BidStatus.ready ? "시작" :
                                status === BidStatus.sale ? "종료" : "완료"
                        }
                    </Button>
                    <Button
                        variant={"light"}
                        onClick={()=>{setAddClientIndex(index)}}
                    >추가</Button>
                    <Button
                        variant={"secondary"}
                        onClick={()=>{setModifyIndex(index)}}
                    >수정</Button>
                    <Button
                        variant={"danger"}
                        onClick={()=>{removeItem(index).then()}}
                    >삭제</Button>
                </ButtonGroup>
            </td>
        </tr>
    )
}