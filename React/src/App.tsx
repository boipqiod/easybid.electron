import {AppRouter} from './routes/AppRouter';
import {AuthProvider} from "./context/AuthProvider";
import {ProductProvider} from "./context/ProductProvider";
import {ToastContainer, Slide} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
    return (
        <AuthProvider>
            <ProductProvider>
                <AppRouter/>
                <ToastContainer
                    position="bottom-center"
                    autoClose={1000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                    transition={Slide}
                />
            </ProductProvider>
        </AuthProvider>
    );
}

export default App;
