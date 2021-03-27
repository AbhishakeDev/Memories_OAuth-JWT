import React, { useState } from 'react';
import useStyles from './styles';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import Input from './Input';
import { GoogleLogin } from 'react-google-login';
import Icon from './Icon';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const Auth = () => {


    const dispatch = useDispatch();
    const [formData, setFormData] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);
    const classes = useStyles();
    const [isSignup, setIsSignup] = useState(false);
    const history = useHistory();

    // console.log(formData);


    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    }
    const googleSuccess = async (res) => {
        console.log(res);
        const result = res?.profileObj; //the ?. operator is very imp as it will not give an error even if there is no value in res it will first check that is res containing any value and then extract something from it
        const token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', payload: { result, token } })
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    const googleFailure = (error) => {
        console.log('Google Sign was unsuccessfull , Try Again Later');
        console.log(error);
    }

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    const handleChange = (e) => (
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    )

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignup) {
            dispatch(signup(formData, history))
        } else {
            dispatch(signin(formData, history))
        }
        console.log(formData);
        // setFormData(initialState);
    }
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                </Avatar>
                <Typography varaint="h5">{isSignup ? 'Sign Up' : 'Sign In'}<i className="far fa-user-unlock"></i></Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (<>
                                <Input type="text" name="firstName" label="First Name" autoFocus handleChange={handleChange} half={6} />
                                <Input type="text" name="lastName" label="Last Name" handleChange={handleChange} half={6} />
                            </>)
                        }
                        <Input name="email" label="Email Address" autoFocus handleChange={handleChange} type="email" />
                        <Input name="password" type={showPassword ? "text" : "password"} label="Password" handleChange={handleChange} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />}
                    </Grid>

                    <Button color="primary" type="submit" fullWidth variant="contained" className={classes.submit}>
                        {isSignup ? 'Sign up' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                        clientId="643492573472-ts2ea8ogo36bempl3el6eqfjsu5b85ni.apps.googleusercontent.com" ß
                        render={(renderProps) => (
                            <Button className={classes.googleButton}
                                color="primary" onClick={renderProps.onClick} fullWidth disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justify="center">
                        <Grid item >
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign up "}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container >
    )
}

export default Auth
