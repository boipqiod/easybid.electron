import {useCopyText} from "../../hook/useCopyText";
import {MainTextItem} from "../main/components/Text/MainTextItem";
import React from "react";

export const Chat = () => {
    const { copyTextList, removeAllText } = useCopyText()

    return (
            <div
                className="m-5" style={{ overflow: "scroll" }}>

                <div className="card">
                    <div className="card-header">

                        <div className="d-flex justify-content-between">
                            <div></div>
                            <div className="card-title">
                                복사할 텍스트
                            </div>
                            <button
                                onClick={removeAllText}
                                className="btn btn-danger">전체 삭제</button>
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
            </div>
    )
}