import React, {useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {MainHeader} from './components/MainHeader';
import {MainAdder} from './components/MainAdder';
import {MainTable} from "./components/Table/MainTable";
import {MainModifyModal} from "./components/Modals/MainModifyModal";
import {useBid} from "../../hook/useBid";
import Storage from "../../Utils/Storage";
import {MainAddClientModal} from "./components/Modals/MainAddClientModal";
import {MainFooter} from "./components/MainFooter";
import {MainText} from "./components/Text/MainText";
import {MainDisplay} from "./components/MainDisplay";
import {useMain} from "../../hook/useMain";

export const Main: React.FC = () => {
    const {modifyIndex, addClientIndex} = useBid()
    const fileName = Storage.getFileName()
    const url = Storage.getYoutubeUrl()
    const main = useMain()

    return (
        <div className="container d-flex flex-column align-items-center vw-100">
            <div style={{width: "800px"}} className="d-flex flex-column justify-content-center text-center mb-5">
                <MainHeader/>

                {
                    fileName && fileName !== "" && url && url !== "" &&
                    <>
                        <MainDisplay />
                        <MainAdder/>
                        <MainTable/>
                        <MainText />
                        <MainFooter/>
                    </>
                }
            </div>

            {
                modifyIndex !== -1 &&
                <MainModifyModal />
            }

            {
                addClientIndex !== -1 &&
                <MainAddClientModal />
            }

        </div>
    )

}
