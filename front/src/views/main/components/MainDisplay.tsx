import React, {useState} from "react";
import {MainDisplaySetting} from "./Modals/MainDisplaySetting";
import {useBid} from "../../../hook/useBid";
import {useSetting} from "../../../hook/useSetting";

export const MainDisplay: React.FC = () => {
    const {onSaleIndex, bidItems} = useBid()
    const {setting, openSetting } = useSetting()

    return (
        <>
            <a
                className="btn btn-secondary w-100 m-1"
                href="/display"
                target="_blank"
            >판매 정보 열기</a>

            <div className="card w-100 m-1">
                <div className="card-header">
                    판매중인 상품
                </div>
                {
                    onSaleIndex === -1 ?
                        <div className="d-flex card-body flex-column">
                            <p>판매 중인 상품이 없습니다.</p>
                        </div> :
                        <div id="div-sale-on" className="d-flex card-body flex-column">
                            <p>상품명 : {bidItems[onSaleIndex].name}</p>
                            <p>구매 갯수 : {bidItems[onSaleIndex].saleAmount}</p>
                            {
                                bidItems[onSaleIndex].amount !== 0 &&
                                <p>남은 갯수 : {bidItems[onSaleIndex].amount - bidItems[onSaleIndex].saleAmount}</p>
                            }
                        </div>
                }
            </div>

            {
                setting &&
                <MainDisplaySetting
                    close={openSetting}
                />
            }
            <hr/>

        </>


    )
}
