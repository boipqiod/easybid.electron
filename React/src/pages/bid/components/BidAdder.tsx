import React, {ChangeEventHandler, useState} from "react";
import {useBid} from "../../../hook/useBid";
import {BidItem, BidStatus} from "../../../utils/tpye";

export const BidAdder = () => {

    const {addItem} = useBid()

    const [newItem, setNewItem] = useState<BidItem>({
        amount: 0,
        name: "",
        price: 0,
        clients: [],
        saleAmount: 0,
        status: BidStatus.ready,
        productId: ""
    })

    const inputChange: ChangeEventHandler<HTMLInputElement> = (event) =>{
        const element = event.target as HTMLInputElement
        const id = element.id
        const item = {...newItem}

        switch (id){
            case "name":
                item.name = element.value
                break
            case "price" :
                item.price = parseInt(element.value)
                break
            case "amount" :
                item.amount = parseInt(element.value)
                break
        }

        setNewItem(item)
    }

    const submit = () =>{
        addItem(newItem).then()
    }

    return (
        <>
            <div className="card w-100 m-1">
                <div className="card-header">
                    경매 상품 추가
                </div>
                <div className="card-body">
                    <div className="d-flex m-2">
                        <div className="row">
                            <div className="col">
                                <label htmlFor="name">상품 이름</label>
                                <input
                                    id="name"
                                    className="form-control m-1"
                                    placeholder="상품 이름"
                                    onChange={inputChange}
                                    value={newItem.name}
                                />
                            </div>
                            <div className="col">
                                <label htmlFor="price">개당 금액</label>
                                <input type="number"
                                       id="price"
                                       className="form-control m-1"
                                       placeholder="개당 금액"
                                       min="1"
                                       onChange={inputChange}
                                       value={newItem.price === 0 ? "" : newItem.price}
                                />
                            </div>
                            <div className="col">
                                <label htmlFor="amount">판매 갯수</label>
                                <input type="number"
                                       id="amount"
                                       className="form-control m-1"
                                       placeholder="판매 갯수"
                                       min="0"
                                       onChange={inputChange}
                                       value={newItem.amount === 0 ? "" : newItem.amount}
                                />
                            </div>
                        </div>
                    </div>
                    <button
                        id="button-product-add"
                        className="btn btn-primary w-100"
                        onClick={submit}
                    >+</button>
                </div>
            </div>
        </>)
}