import './App.css';
import LoginProvider from './LoginProvider/Provider';
import AppContent from "./AppContent/AppContent";
import {CookiesProvider} from "react-cookie";

function App() {
    return (
        <CookiesProvider>
            <LoginProvider>
                <AppContent/>
            </LoginProvider>
        </CookiesProvider>
    );
}

export default App;
