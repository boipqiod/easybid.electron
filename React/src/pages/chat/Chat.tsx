import {useCopyText} from "../../hook/useCopyText";
import {MainTextItem} from "../main/components/Text/MainTextItem";
import React, {useEffect} from "react";
import {Button, Container, Table} from "react-bootstrap";

export const Chat = () => {
    const { copyTextList, removeAllText, setCopyTextList } = useCopyText()

    useEffect(() => {
        window.addEventListener('storage', (e:StorageEvent) => {
            if(e.key === "copy"){
                const list = JSON.parse(e.newValue || "[]")
                setCopyTextList(list)
            }
        })

        return () => {
            document.removeEventListener('storage', ()=>{})
        }
    }, []);

    return (
        <Container
            className=" w-100 d-flex flex-column align-items-center"
        >
            <div className={"w-100 d-flex justify-content-end mt-5"}>

                <Button
                    variant={"danger"}
                    onClick={removeAllText}
                >전체 삭제</Button>
            </div>
            <Table>
                <thead>
                <tr>
                    <th className="col-1">#</th>
                    <th className="col">텍스트</th>
                    <th className="col-3">동작</th>
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
            </Table>

        </Container>


    )
}