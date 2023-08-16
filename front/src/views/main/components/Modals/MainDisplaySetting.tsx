import React, {ChangeEventHandler, useEffect, useState} from "react";
import {DisplaySetting} from "../../../../common/tpye";
import Storage from "../../../../Utils/Storage";
import { SketchPicker } from 'react-color';
import {ColorPicker} from "../../../common/ColorPicker";

type props = {
    close: ()=>void
}

export const MainDisplaySetting: React.FC<props> = (props) =>{

    const [setting, setSetting] = useState<DisplaySetting>()
    const [productColor, setProductColor] = useState<string>("#000000")

    useEffect(()=>{
        const _setting = Storage.getSetting()
        if(_setting) {
            setSetting(_setting)
        }else{
            const settingInit: DisplaySetting = {
                product: {
                    size: 100,
                    color: "#000000"
                },
                client: {
                    size: 100,
                    color: "#000000"
                },
                backGround: {
                    color: "#008000"
                }
            }
            setSetting(settingInit)
        }

    },[])

    useEffect(()=>{
        if(setting) Storage.saveSetting(setting)
    }, [setting])

    const onChangeTextProduct: ChangeEventHandler<HTMLInputElement> = (event)=>{
        if(!setting) return

        const _setting = {...setting}
        _setting.product.size = Number(event.target.value)
        setSetting(_setting)
    }
    const onChangeTextClient: ChangeEventHandler<HTMLInputElement> = (event)=>{
        if(!setting) return

        const _setting = {...setting}
        _setting.client.size = Number(event.target.value)
        setSetting(_setting)
    }

    const onChangeColorProduct = (color: string) =>{
        if(!setting) return

        const _setting = {...setting}
        _setting.product.color = color
        setSetting(_setting)
    }
    const onChangeColorClient = (color: string) =>{
        if(!setting) return

        const _setting = {...setting}
        _setting.client.color = color
        setSetting(_setting)
    }

    return (
        <div className="d-flex vw-100 vh-100 justify-content-center align-items-center position-fixed"
             style={{backgroundColor: "rgba(0,0,0,0.41)", top: 0, left: 0, zIndex: 100}}>
            <div className="card overflow-scroll" style={{width: 800, height: "80vh"}}>
                <div className="card-header"><div className="card-title">
                    <h3>설정</h3>
                </div></div>
                <div className="card-body px-5">
                    <div className="row">
                        <h5 className="fw-bold">글자 크기</h5>
                        <span>판매 상품 ({setting?.product.size})</span>
                        <input
                            onChange={onChangeTextProduct}
                            type={"range"}
                            className="form-range mb-4"
                            value={setting?.product.size ?? 100}
                            min="20"
                            max="200"
                        />
                        <ColorPicker
                            color={setting?.product.color ?? "#000000"}
                            setColor={onChangeColorProduct}
                        />
                        <p>구매자 ({setting?.client.size})</p>
                        <input
                            onChange={onChangeTextClient}
                            type={"range"}
                            className="form-range mb-4"
                            value={setting?.client.size ?? 100}
                            min="1"
                            max="100"/>
                        <ColorPicker
                            color={setting?.client.color ?? "#000000"}
                            setColor={onChangeColorClient}
                        />
                    </div>
                    <hr/>
                    <div className="row">
                        <button className="btn btn-success" onClick={props.close}>닫기</button>
                    </div>
                </div>
            </div>
        </div>
    )
}