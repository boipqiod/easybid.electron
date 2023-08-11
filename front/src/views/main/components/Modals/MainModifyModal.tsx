import React, {ChangeEventHandler, useState} from "react";
import {useBid} from "../../../../hook/useBid";
import {BidItem, Client} from "../../../../common/tpye";

export const MainModifyModal: React.FC = () => {

    const {modifyIndex, bidItems, setModifyIndex, modifyItem} = useBid()
    const [item, setItem] = useState<BidItem>(bidItems[modifyIndex])

    const onChangeProduct: ChangeEventHandler<HTMLInputElement> = (e) => {
        const element = e.target as HTMLInputElement
        const id = element.id
        const value = element.value

        const _item = {...item}

        switch (id) {
            case "name":
                _item.name = value
                break
            case "price":
                _item.price = parseInt(value)
                break
            case "amount":
                _item.amount = parseInt(value)
                break
        }

        setItem(_item)
    }

    const removeItem = (index: number) =>{
        const _item = {...item}
        _item.clients.splice(index, 1)
        setItem(_item)
    }

    const clientTable = (index: number, client: Client) =>{
        return (
            <tr key={index}>
                <td className="col-1">
                    {index}
                </td>
                <td>
                    <input
                        id={`client_name_${index}`}
                        className="form-control"
                        value={client.name}
                        onChange={(event)=>{
                            const _item = {...item}
                            _item.clients[index].name = event.target.value
                            setItem(_item)
                        }}
                    /></td>
                <td>
                    <input
                        type={"number"}
                        id={`client_amount_${index}`}
                        min={1}
                        className="form-control"
                        value={client.amount}
                        onChange={(event)=>{
                            const _item = {...item}
                            _item.clients[index].amount = parseInt(event.target.value)
                            setItem(_item)
                        }}
                    /></td>
                <td>
                    <input
                        id={`client_note_${index}`}
                        className="form-control"
                        value={client.note}
                        onChange={(event)=>{
                            const _item = {...item}
                            _item.clients[index].note = event.target.value === "" ? undefined : event.target.value
                            setItem(_item)
                        }}
                    /></td>
                <td className="col-2">
                    <button
                        onClick={()=>{ removeItem(index) }}
                        className="btn btn-danger">제거</button>
                </td>
            </tr>
        )
    }

    const addClient = () =>{
        const _item = {...item}
        _item.clients.push({
            amount: 1,
            name: ""
        })
        setItem(_item)
    }

    const submit = () => {
        modifyItem(item).then()
    }

    return (
        <div id="modify-modal" className="d-flex vw-100 vh-100 position-fixed justify-content-center align-items-center"
             style={{backgroundColor: "rgba(0,0,0,0.41)", top: 0, left: 0}}>
            <div className="card row m-2" style={{width: "800px"}}>
                <div className="card-header">
                    <div className="card-title">
                        <h3>상품 정보 수정</h3>
                    </div>
                </div>
                <div className="card-body p-4">
                    <h5>상품 정보</h5>
                    <div className="row">
                        <div className="col">
                            <label htmlFor="name">상품 이름</label>
                            <input
                                id="name"
                                onChange={onChangeProduct}
                                className="form-control m-1"
                                placeholder="상품 이름"
                                value={item.name}
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="price">개당 금액</label>
                            <input
                                type="number"
                                id="price"
                                onChange={onChangeProduct}
                                className="form-control m-1"
                                placeholder="개당 금액"
                                min="1"
                                value={item.price === 0 ? "" : item.price}
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="amount">판매 갯수</label>
                            <input
                                type="number"
                                id="amount"
                                onChange={onChangeProduct}
                                className="form-control m-1"
                                placeholder="판매 갯수"
                                min="0"
                                value={item.amount === 0 ? "" : item.amount}
                            />
                        </div>
                    </div>
                    <hr/>
                    {/*고객 정보*/}
                    <div style={{maxHeight:"300px", overflow:"scroll"}} className="row justify-content-center px-5">
                        <h5>구매 고객 정보</h5>
                        <table className="table table-striped table-sm text-center">
                            <thead><tr>
                                <td>No.</td>
                                <td>이름</td>
                                <td>수량</td>
                                <td>비고</td>
                            </tr></thead>
                            <tbody>
                            {
                                item.clients.map((value, index) => {
                                    return clientTable(index, value)
                                })
                            }
                            </tbody>
                        </table>
                        <div
                            className="btn btn-success"
                            onClick={addClient}
                        >구매 고객 추가하기</div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col mb-2">
                            <button
                                onClick={submit}
                                className="btn btn-primary w-100"> 저장
                            </button>
                        </div>
                        <div className="col mb-2">
                            <button
                                onClick={() => {
                                    setModifyIndex(-1)
                                }}
                                className="btn btn-danger w-100">취소
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}