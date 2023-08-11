import React, {useState} from "react";
import {useBid} from "../../../../hook/useBid";
import {Client} from "../../../../common/tpye";

export const MainAddClientModal: React.FC = () =>{
    const {bidItems, addClientIndex, setAddClientIndex, addClient} = useBid()
    const [client, setClient] = useState<Client>({name:"", amount: 1})

    const submit = async () =>{
        await addClient(client)
    }

    return (
        <div className="d-flex vw-100 vh-100 justify-content-center align-items-center position-fixed"
             style={{backgroundColor: "rgba(0,0,0,0.41)", top: 0, left: 0}}>
            <div className="card">
                <div className="card-header">
                    <div className="card-title">
                    {`[${bidItems[addClientIndex].name}] 상품에 구매자 추가하기`}
                    </div>
                </div>
                <div className="card-body p-4">
                    <div className="row mb-3">
                        <div className="row text-center">
                            <label className="col-6">이름</label>
                            <label className="col-6">수량</label>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input
                                    className="form-control"
                                    value={client.name}
                                    onChange={(event)=>{
                                        const _client = {...client}
                                        _client.name = event.target.value
                                        setClient(_client)
                                    }}
                                />
                            </div>
                            <div className="col-6">
                                <input
                                    type="number"
                                    className="form-control"
                                    value={client.amount === 0 ? "" : client.amount}
                                    min={1}
                                    onChange={(event)=>{
                                        const _client = {...client}
                                        _client.amount = parseInt(event.target.value)
                                        setClient(_client)
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row w-100">
                        <div className="col">
                            <button
                                onClick={submit}
                                className="w-100 btn btn-primary">
                                저장</button>
                        </div>
                        <div className="col">
                            <button
                                onClick={()=>{setAddClientIndex(-1)}}
                                className="w-100 btn btn-danger">
                                취소</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}