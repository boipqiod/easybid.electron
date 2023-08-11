import * as React from 'react';
import logo from '../../../assets/easybid.logo.png'
import {useBid} from "../../../hook/useBid";
import {ChangeEventHandler, useState} from "react";
import Storage from "../../../Utils/Storage";
import { IoSettingsOutline } from "react-icons/io5";
import {MainDisplaySetting} from "./Modals/MainDisplaySetting";

export const MainHeader: React.FC = () => {

    const {onSaleIndex, bidItems, initBid} = useBid()
    const fileName = Storage.getFileName() ?? ""
    const url = Storage.getYoutubeUrl() ?? ""

    const [isEdit, setIsEdit] = useState<boolean>(fileName === "")
    const [isSetting, setIsSetting] = useState<boolean>(false)
    const [bidName, setBidName] = useState<string>(fileName)
    const [youtubeUrl, setYoutubeUrl] = useState<string>(url)

    const onChangeFileName: ChangeEventHandler<HTMLInputElement> = (event) => {
        setBidName(event.target.value)
    }
    const onChangeUrl: ChangeEventHandler<HTMLInputElement> = (event) => {
        setYoutubeUrl(event.target.value)
    }

    const edit = async () => {
        setIsEdit(false)
        const success = await initBid(bidName, youtubeUrl)
        setIsEdit(!success)
    }

    const openSetting = () =>{
        if(isSetting){
            setIsSetting(false)
        }else{
            setIsSetting(true)
        }
    }

    return (
        <>
            <div>
                <img style={{cursor: "pointer"}} onClick={() => {
                    window.location.reload()
                }} className='mt-5' src={logo} alt="reload"/>
            </div>

            <div className="row m-3 align-items-center">
                <div className="col-11 row p-0">
                    <div className="row mb-1">
                        <input
                            id="input_name"
                            className="input-group-sm input-group-tex"
                            placeholder="유튜브 채팅 URL"
                            onChange={onChangeUrl}
                            disabled={!isEdit}
                            value={youtubeUrl}
                        />
                    </div>
                    <div className="row">
                        <input
                            id="input_name"
                            className="input-group-sm input-group-tex col-10"
                            placeholder="경매 이름"
                            onChange={onChangeFileName}
                            disabled={!isEdit}
                            value={bidName}
                        />
                        {
                            isEdit ?
                                <button
                                    onClick={edit}
                                    id="button_reload"
                                    className="col btn btn-sm btn-info mx-2"
                                >저장</button> :
                                <button
                                    onClick={() => {
                                        setIsEdit(true)
                                    }}
                                    id="button_reload"
                                    className="col btn btn-sm btn-info mx-2"
                                >변경</button>
                        }
                    </div>
                </div>
                <div className="col h-100 align-items-center justify-content-center p-0">
                    <button
                        className="btn btn-sm btn-outline-primary m-0"
                        onClick={openSetting}
                    >
                        <IoSettingsOutline /> 설정
                    </button>
                </div>
            </div>

            {
                fileName && fileName !== "" && url && url !== "" &&
                <>
                    <a
                        className="btn btn-secondary w-100 m-1"
                        href="/display"
                        target="_blank"
                    >판매 정보 열기</a>

                    <div className="card w-100 m-1">
                        <div className="card-header">
                            판매중인 상품
                        </div>
                        {
                            onSaleIndex === -1 ?
                                <div className="d-flex card-body flex-column">
                                    <p>판매 중인 상품이 없습니다.</p>
                                </div> :
                                <div id="div-sale-on" className="d-flex card-body flex-column">
                                    <p>상품명 : {bidItems[onSaleIndex].name}</p>
                                    <p>구매 갯수 : {bidItems[onSaleIndex].saleAmount}</p>
                                    {
                                        bidItems[onSaleIndex].amount !== 0 &&
                                        <p>남은 갯수 : {bidItems[onSaleIndex].amount - bidItems[onSaleIndex].saleAmount}</p>
                                    }
                                </div>
                        }
                    </div>
                </>
            }
            <hr/>

            {
              isSetting &&
                <MainDisplaySetting
                    close={openSetting}
                />
            }
        </>)
}