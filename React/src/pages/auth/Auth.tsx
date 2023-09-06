import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {useAuth} from "../../hook/useAuth";

export const Auth: React.FC = () => {
    const [id, setId] = useState<string>("")
    const [passkey, setPasskey] = useState<string>("")
    const {login} = useAuth()

    const handelLogin = async () => {
        if(id === "" || passkey === "") {
            alert("아이디와 비밀번호를 입력해주세요.")
            return
        }
        await login(id, passkey)
    }
    const handelEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handelLogin().then()
        }
    }

    return (
        <div className="container vw-100 vh-100 d-flex align-items-center justify-content-center">
            <div className="card">
                <div className="card-header mb-2">
                    <div className="card-title">로그인 1.0.1</div>
                </div>
                <div className="card-body d-flex flex-column px-5 py-4">
                    <label>아이디
                        <input
                            className="form-control mb-2"
                            value={id}
                            onChange={(event) => {
                                setId(event.target.value)
                            }}
                            onKeyDown={handelEnter}
                        />
                    </label>
                    <label>비밀번호
                        <input
                            className="form-control mb-2"
                            value={passkey}
                            type={"password"}
                            onChange={(event) => {
                                setPasskey(event.target.value)
                            }}
                            onKeyDown={handelEnter}
                        />
                    </label>
                    <br/>
                    <button
                        className="btn btn-sm btn-success w-100"
                        onClick={handelLogin}
                    >
                        입력
                    </button>
                </div>
            </div>
        </div>
    )
}