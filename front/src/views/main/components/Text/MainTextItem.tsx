import React from "react";
import {useCopyText} from "../../../../hook/useCopyText";

type props = {
    index: number,
    text: string
}

export const MainTextItem: React.FC<props> = (props) =>{
    const {removeText, copyText} = useCopyText()

    return (
        <tr>
            <td>{props.index}</td>
            <td>{props.text}</td>
            <td><button
                className="btn btn-sm btn-success m-0 p-1"
                onClick={()=>{copyText(props.index).then()}}
            >
                복사</button></td>
            <td><button
                className="btn btn-sm btn-danger m-0 p-1"
                onClick={()=>{ removeText(props.index) }}
            >삭제</button></td>
        </tr>
    )
}