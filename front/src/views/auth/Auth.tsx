import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import API from "../../model/API";
import {useAuth} from "../../hook/useAuth";

export const Auth: React.FC = () =>{
    const [id, setId] = useState<string>("")
    const {login} = useAuth()


    return (
        <div className="container vw-100 vh-100 d-flex align-items-center justify-content-center">
            <div className="card">
                <div className="card-header mb-2">
                    <div className="card-title">로그인</div>
                </div>
                <div className="card-body px-5 py-4">
                    <label>이지비드 아이디 입력</label>
                    <input
                        className="form-control mb-2"
                        value={id}
                        onChange={(event)=>{
                            setId(event.target.value)
                        }}
                    />
                    <button
                        className="btn btn-sm btn-success w-100"
                        onClick={()=>{login(id).then()}}
                    >
                        입력
                    </button>
                </div>
            </div>
        </div>
    )
}