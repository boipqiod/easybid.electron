import React, {ReactNode, useEffect} from "react";
import {BidStatus} from "../../../../common/tpye";
import {useBid} from "../../../../hook/useBid";

interface MainTableItemProps {
    index: number
    name: string
    price: number
    amount: number
    status: BidStatus
}

export const MainTableItem: React.FC<MainTableItemProps> = ({index, name, price, amount, status}) => {

    const {startBid, endBid, restartBid, removeItem, setModifyIndex, setAddClientIndex} = useBid()

    const getStatusButton = (): ReactNode => {
        switch (status) {
            case BidStatus.ready:
                return <button
                    className="btn btn-sm btn-success"
                    onClick={()=>{startBid(index).then()}}
                >시작</button>
            case BidStatus.sale:
                return <button
                    className="btn btn-sm btn-info"
                    onClick={()=>{endBid(index).then()}}
                >종료</button>
            case BidStatus.end:
                return <button
                    className="btn btn-sm btn-dark"
                    onClick={()=>{restartBid(index).then()}}
                >완료</button>
        }
    }

    return (
        <tr>
            <td className="col-1">{index}</td>
            <td className="col-3">{name}</td>
            <td className="col-2">{price}</td>
            <td className="col-2">{amount}</td>
            <td>
                {getStatusButton()}
            </td>
            <td>
                <button
                    className="btn btn-sm btn-danger"
                    onClick={()=>{removeItem(index).then()}}
                >삭제</button>
            </td>
            <td>
                <button
                    className="btn btn-sm btn-secondary"
                    onClick={()=>{setAddClientIndex(index)}}
                >추가</button>
            </td>
            <td>
                <button
                    className="btn btn-sm btn-secondary"
                    onClick={()=>{setModifyIndex(index)}}
                >수정</button>
            </td>
        </tr>)
}