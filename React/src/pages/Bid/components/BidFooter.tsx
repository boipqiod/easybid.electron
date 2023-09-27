import React from "react";
import File from "../../../utils/File";
import {useBid} from "../../../hook/common/useBid";
import {Button} from "react-bootstrap";

export const BidFooter = () => {
    const {bidItems} = useBid()

    return (
        <div className="w-100">
            <Button
                className={"w-100"}
                onClick={()=> File.exportExcel(bidItems)}
                variant={"warning"}
            > 엑셀로 저장하기</Button>
        </div>
    )
}