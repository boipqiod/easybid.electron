import React from "react";
import {DisplaySetting} from "../../../utils/tpye";

type props = {
    name: string
    amount: number
    setting?: DisplaySetting
}

export const DisplayClientItem = ({name, amount, setting}: props) => {
    return (
        <h1 style={{
            fontSize: setting?.client.size,
            color: setting?.client.color,
            fontWeight: 900,
        }}
            className="col-3">
            {`${name}님 ${amount}개`}
        </h1>
    )
}