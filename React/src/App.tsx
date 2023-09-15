import {AppRouter} from './routes/AppRouter';
import {AuthProvider} from "./context/AuthProvider";
import {ProductProvider} from "./context/ProductProvider";

function App() {
    return (
        <AuthProvider>
            <ProductProvider>
                <AppRouter/>
            </ProductProvider>
        </AuthProvider>
    );
}

export default App;
