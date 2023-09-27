import React from "react";
import { Helmet } from 'react-helmet';
import Utils from "../../utils/Utils";
import {useDisplayPage} from "../../hook/Dispaly/useDisplayPage";
import {DisplayClientItem} from "./components/DisplayClientItem";

export const Display = () => {

    const {bidItems, setting, onSaleIndex } = useDisplayPage()

    return (
        <>
            <Helmet>
                <title>EasyBid: 판매자 정보</title>
            </Helmet>
            <div style={{backgroundColor: "green"}} className="vw-100 vh-100 d-flex align-items-center flex-column">
                {
                    onSaleIndex !== -1 &&
                    <>
                        <div className="justify-content-center align-items-center flex-column my-5">
                            <h1 style={{
                                fontSize: setting?.product.size,
                                color: setting?.product.color,
                                fontWeight: 900,
                            }}>{bidItems[onSaleIndex].name}</h1>
                            <h1 style={{
                                fontSize: setting?.product.size,
                                color: setting?.product.color,
                                fontWeight: 900,
                            }}>{bidItems[onSaleIndex].price !== 0 && Utils.formatCurrency(bidItems[onSaleIndex].price)}</h1>
                        </div>
                        <div className="row w-100 text-center">
                            {
                                bidItems[onSaleIndex].clients.map((client, index) => {
                                    return (
                                        <DisplayClientItem
                                            key={index}
                                            name={client.name}
                                            amount={client.amount}
                                            setting={setting}
                                        />
                                    )
                                })
                            }
                        </div>
                    </>
                }
            </div>
        </>
    )
}
