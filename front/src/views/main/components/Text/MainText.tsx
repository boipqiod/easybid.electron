import React from "react";
import {MainTextItem} from "./MainTextItem";
import {useCopyText} from "../../../../hook/useCopyText";

export const MainText: React.FC = () => {
    const {copyTextList} = useCopyText()

    return (
        <div className="card m-1 w-100" style={{maxHeight: 600, overflow: "scroll"}}>
            <div className="card-header">

                <div className="card-title">
                    복사할 텍스트
                </div>
            </div>
            <div className="card-body">
                <table className="table">
                    <thead>
                    <tr>
                        <th className="col-1">#</th>
                        <th className="col">텍스트</th>
                        <th className="col-1">전송</th>
                        <th className="col-1">복사</th>
                        <th className="col-1">삭제</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        copyTextList.map((value, index) =>
                            <MainTextItem
                                text={value}
                                index={index}
                                key={index}
                            />
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
