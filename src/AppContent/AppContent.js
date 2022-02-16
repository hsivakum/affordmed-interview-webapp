import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import {useContext, useEffect, useState} from "react";
import {LoginContext} from "../LoginProvider/Context";
import Home from "../Home/Home";

const AppContent = () => {
    const {isLoggedIn} = useContext(LoginContext);
    const [redirect, setRedirect] = useState('');
    useEffect(() => {
        if (isLoggedIn) {
            setRedirect('/home');
            return;
        }
        setRedirect('/signup');
    }, [isLoggedIn]);
    return (
        <Router>
            <Switch>
                <Route
                    exact
                    path="/"
                    render={() => <Redirect to={redirect} />}
                />
                <Route path="/home" component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/signup" component={Signup}/>
            </Switch>
        </Router>
    )
};

export default AppContent