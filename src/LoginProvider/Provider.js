import {useEffect, useState} from "react";
import {LoginContext} from "./Context";
import {useCookies} from "react-cookie";

const Provider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [accessToken, setAccessToken] = useState(null);
    const [cookie, setCookie, removeCookie] = useCookies(['token']);

    // useEffect(() => {
    //     console.log('cookie', cookie);
    // }, [cookie]);

    useEffect(() => {
        console.log('token changed');
        if (accessToken) {
            setIsLoggedIn(true);
            return;
        }
        setIsLoggedIn(false);
    }, [accessToken, isLoggedIn]);

    return (
        <LoginContext.Provider value={{isLoggedIn, setIsLoggedIn, setAccessToken, accessToken}}>
            {children}
        </LoginContext.Provider>
    );
};

export default Provider;