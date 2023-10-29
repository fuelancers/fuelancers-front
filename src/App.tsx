// hooks
import { SnackbarProvider } from "notistack";
// router
import { Routes } from "./routes";

function App() {
    return (
        <div className="App">
            <SnackbarProvider>
                {/* *** routes ***  */}
                <Routes />
            </SnackbarProvider>
        </div>
    );
}

export default App;
