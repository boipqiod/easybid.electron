import React from "react";
import {useBid} from "../../../hook/useBid";
import File from "../../../Utils/File";

export const MainFooter: React.FC = () =>{
    const {bidItems} = useBid()

    const onClick = () =>{
        new File().exportExcel(bidItems).then()
    }

    return (
        <div className="w-100 m-2">
            <button onClick={onClick} id="button-save-excel" className="btn btn-warning w-100"> 엑셀로 저장하기</button>
        </div>
    )
}