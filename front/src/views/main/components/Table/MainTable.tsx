import React, {useEffect, useState} from "react";
import {useBid} from "../../../../hook/useBid";
import {MainTableItem} from "./MainTableItem";
import Utils from "../../../../Utils/Utils";

export const MainTable: React.FC = () => {
    const {bidItems} = useBid()

    return (
        <>
            <div className="card w-100 m-1">
                <div className="card-header">
                    등록된 상품
                </div>
                <div className="card-body">
                    <table className="table table-striped table-sm text-center">
                        <thead>
                        <tr>
                            <td>No.</td>
                            <td>상품 이름</td>
                            <td>개당 금액</td>
                            <td>판매 갯수</td>
                            <td>상태</td>
                            <td>삭제</td>
                            <td>추가</td>
                            <td>수정</td>
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
                    </table>
                </div>
            </div>
            <hr/>
        </>
    )
}
