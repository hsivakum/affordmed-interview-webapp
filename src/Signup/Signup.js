import {Button, Container, Input, Typography} from "@mui/material";
import {useState} from "react";
import {validateEmail} from "../utils/validators";
import axios from "axios";
import {Redirect} from "react-router-dom";

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [usernameError, setUsernameError] = useState(null);

    const onSubmit = () => {
        if (!validateEmail(username)) {
            setUsernameError('Please enter a valid username');
            return;
        }
        setUsernameError(null);
        axios.post(`http://localhost:3030/signup`, {
            firstname,
            lastname,
            email: username,
            password
        }).then(({data}) => {
            console.log('successfully created user', data);
            setRedirect(true);
        }).catch((err) => {
            console.log('unable to signup ', err);
        })
    };

    return (
        <Container style={{alignItems: 'center', justifyContent: 'center'}}>
            {
                redirect ? <Redirect to="/login"/> : null
            }
            <div style={{display: 'flex', flexDirection: 'column', width: 200}}>
                <Input type="text" onChange={({target}) => setFirstname(target.value)} value={firstname}/>
                <Input type="text" onChange={({target}) => setLastname(target.value)} value={lastname}/>
                <Input type="text" onChange={({target}) => setUsername(target.value)} value={username}/>
                <Typography>{usernameError}</Typography>
                <Input type="password" onChange={({target}) => setPassword(target.value)} value={password}/>
            </div>
            <Button onClick={() => onSubmit()}>
                Signup
            </Button>
        </Container>
    )
};

export default Signup;