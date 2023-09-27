import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {useAuth} from "../../hook/useAuth";
import {Button, Card, Container, FormControl} from "react-bootstrap";

export const Auth = () => {

    const {
        handelChange, handelEnter, handelLogin
    } = useAuth()


    return (
        <Container className={"vw-100 vh-100 d-flex align-items-center justify-content-center"}>
            <Card>
                <Card.Header className="mb-2">
                    <Card.Title>로그인 (ver. 1.1.4)</Card.Title>
                </Card.Header>
                <Card.Body className="d-flex flex-column px-5 py-4">
                    <label>아이디
                        <FormControl
                            className="mb-2"
                            name={"id"}
                            onChange={handelChange}
                            onKeyDown={handelEnter}
                        />
                    </label>
                    <label>비밀번호
                        <FormControl
                            className="mb-2"
                            name={"passkey"}
                            type={"password"}
                            onChange={handelChange}
                            onKeyDown={handelEnter}
                        />
                    </label>
                    <br/>
                    <Button
                        size={"sm"}
                        variant={"success"}
                        onClick={handelLogin}
                    >
                        로그인
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    )
}