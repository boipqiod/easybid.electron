import {useNavigate} from "react-router-dom";


export const usePage = () => {
    const navigate = useNavigate();

    return {
        async toBack() { navigate(-1); },
        async toMain() { navigate('/'); },
        async toBid() { navigate('/bid'); },
        async toProduct() { navigate('/product'); },
        async toUser() { navigate('/user'); },
    };
};
