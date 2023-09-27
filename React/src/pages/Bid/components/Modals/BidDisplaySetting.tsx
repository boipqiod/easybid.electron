import React, {ChangeEventHandler, useEffect, useState} from "react";
import StorageUtil from "../../../../utils/StorageUtil";
import {DisplaySetting} from "../../../../utils/tpye";
import {Button, Card, Modal, Stack} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {usePage} from "../../../../hook/utils/usePage";

type props = {
    isShow: boolean
    close: () => void
}

export const BidDisplaySetting: React.FC<props> = (props) => {

    const [setting, setSetting] = useState<DisplaySetting>()

    useEffect(() => {
        const _setting = StorageUtil.getSetting()
        if (_setting) {
            setSetting(_setting)
        } else {
            const settingInit: DisplaySetting = {
                product: {
                    size: 60,
                    color: "#000000",
                    weight: 700
                },
                client: {
                    size: 25,
                    color: "#000000",
                    weight: 700
                },
                backGround: {
                    color: "#008000"
                }
            }
            setSetting(settingInit)
        }

    }, [])

    useEffect(() => {
        if (setting) StorageUtil.saveSetting(setting)
    }, [setting])

    const onChangeTextProduct: ChangeEventHandler<HTMLInputElement> = (event) => {
        if (!setting) return

        const _setting = {...setting}
        _setting.product.size = Number(event.target.value)
        setSetting(_setting)
    }
    const onChangeTextClient: ChangeEventHandler<HTMLInputElement> = (event) => {
        if (!setting) return

        const _setting = {...setting}
        _setting.client.size = Number(event.target.value)
        setSetting(_setting)
    }

    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!setting) return
        const target = event.target as HTMLInputElement
        const value = target.value
        const _setting = {...setting}

        switch (target.id) {
            case "productColor":
                _setting.product.color = value
                break
            case "clientColor":
                _setting.client.color = value
                break
        }
        setSetting(_setting)
    }

    return (
        <Modal
            centered
            show={props.isShow}
            onHide={props.close}
            style={{overflow: "scroll"}}
        >
            <Modal.Header>
                <Card.Title>
                    설정
                </Card.Title>
            </Modal.Header>

            <Modal.Body>
                <Stack
                    gap={5}
                >
                    <h5 className="fw-bold">상품 판매 페이지</h5>
                    <Stack>
                        <p>판매 상품 ({setting?.product.size})</p>
                        <Stack
                            direction={"horizontal"}
                        >
                            <Form.Range
                                onChange={onChangeTextProduct}
                                className={"mx-2"}
                                value={setting?.product.size ?? 100}
                                min="20"
                                max="200"
                            />
                            <Form.Control
                                type="color"
                                id="productColor"
                                value={setting?.product.color ?? "#000000"}
                                onChange={handleColorChange}
                                title="Choose your color"
                            />
                        </Stack>
                    </Stack>
                    <Stack>
                        <p>구매자 ({setting?.client.size})</p>
                        <Stack
                            direction={"horizontal"}
                        >
                            <Form.Range
                                onChange={onChangeTextClient}
                                className={"mx-2"}
                                value={setting?.client.size ?? 100}
                                min="1"
                                max="100"
                            />
                            <Form.Control
                                type="color"
                                id="clientColor"
                                value={setting?.product.color ?? "#000000"}
                                onChange={handleColorChange}
                                title="Choose your color"
                            />
                        </Stack>
                    </Stack>
                    <Stack>
                        <p>구매자 글자 두께</p>
                        <Form>
                            <Form.Check
                                type={"radio"}
                                label={"일반"}
                                name={"clientWeight"}
                                id={"clientWeight1"}
                                checked={setting?.client.weight === 0}
                                onChange={() => {
                                    if (!setting) return
                                    const _setting = {...setting}
                                    _setting.client.weight = 0
                                    setSetting(_setting)
                                }}
                            />
                            <Form.Check
                                type={"radio"}
                                label={"굵게"}
                                name={"clientWeight"}
                                id={"clientWeight2"}
                                checked={setting?.client.weight === 700}
                                onChange={() => {
                                    if (!setting) return
                                    const _setting = {...setting}
                                    _setting.client.weight = 700
                                    setSetting(_setting)
                                }}
                            />
                            <Form.Check
                                type={"radio"}
                                label={"굵게"}
                                name={"clientWeight"}
                                id={"clientWeight2"}
                                checked={setting?.client.weight === 900}
                                onChange={() => {
                                    if (!setting) return
                                    const _setting = {...setting}
                                    _setting.client.weight = 900
                                    setSetting(_setting)
                                }}
                            />

                        </Form>



                    </Stack>

                </Stack>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={props.close}>닫기</Button>
            </Modal.Footer>
        </Modal>
    )
}