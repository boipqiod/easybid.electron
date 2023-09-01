import {BidProvider} from './context/BidProvider';
import {AppRouter} from './routes/AppRouter';
import {CopyTextProvider} from "./context/CopyTextProvider";

function App() {
    return (
        <BidProvider>
            <CopyTextProvider>
                    <AppRouter/>
            </CopyTextProvider>
        </BidProvider>
    );
}

export default App;
