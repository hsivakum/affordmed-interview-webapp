import {useContext, useState} from "react";
import axios from "axios";
import {useCookies} from "react-cookie";
import {validateEmail} from "../utils/validators";
import {Button, Container, Input, Typography} from "@mui/material";
import {LoginContext} from "../LoginProvider/Context";

const Login = () => {
    const {setAccessToken} = useContext(LoginContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState(null);
    const [setCookie] = useCookies(['token']);
    console.log('rendering');
    const onSubmit = () => {
        if (!validateEmail(username)) {
            setUsernameError('Please enter a valid username');
            return;
        }

        setUsernameError(null);
        axios.post(`http://localhost:3030/users/${username}/login`, {
            password
        }).then(({data}) => {
            console.log('successfully obtained jwt token', data);
            setAccessToken(data.access_token);
            // setCookie('token', data.access_token, {
            //     path: '/',
            //     expires: new Date(data.expires_in),
            //     secure: false
            // })
        }).catch((err) => {
            console.log('unable to login ', err);
        })
    };

    return (
        <Container>
            <Input type="text" onChange={({target}) => setUsername(target.value)} value={username}/>
            <Typography>{usernameError}</Typography>
            <Input type="password" onChange={({target}) => setPassword(target.value)} value={password}/>
            <Button onClick={() => onSubmit()}>
                Login
            </Button>
        </Container>
    )
};

export default Login;