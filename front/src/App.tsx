import {BidProvider} from './context/BidProvider';
import {AppRouter} from './routes/AppRouter';
import {SSEProvider} from "./context/SSEProvider";
import {CopyTextProvider} from "./context/CopyTextProvider";

function App() {
    return (
        <BidProvider>
            <CopyTextProvider>
                <SSEProvider>
                    <AppRouter/>
                </SSEProvider>
            </CopyTextProvider>
        </BidProvider>
    );
}

export default App;
