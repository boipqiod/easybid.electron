import React from "react";
import {useCopyText} from "../../../../hook/useCopyText";
import {Button, ButtonGroup} from "react-bootstrap";

type props = {
    displayIndex: number,
    index: number,
    text: string
}

export const BidTextItem: React.FC<props> = (props) => {
    const {removeText, copyText, sendMessage} = useCopyText()

    return (
        <tr>
            <td>{props.displayIndex}</td>
            <td>{props.text}</td>
            <td>
                <ButtonGroup
                    size={"sm"}
                >
                    <Button
                        variant={"success"}
                        onClick={() => { sendMessage(props.index).then() }}
                    >
                        전송
                    </Button>
                    <Button
                        onClick={() => { copyText(props.index).then() }}
                    >
                        복사
                    </Button>
                    <Button
                        variant={"danger"}
                        onClick={() => { removeText(props.index)  }}
                    >삭제
                    </Button>
                </ButtonGroup>
            </td>

        </tr>
    )
}