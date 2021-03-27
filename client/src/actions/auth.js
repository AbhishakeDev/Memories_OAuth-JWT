import { AUTH } from '../constants/actionTypes';

import * as API from '../api/index.js';

export const signin = (formData, history) => async (dispatch) => {
    try {
        //login the user
        const { data } = await API.signin(formData);
        dispatch({ type: 'AUTH', payload: data })

        history.push('/');
    } catch (error) {
        console.log(error);
    }
}


export const signup = (formData, history) => async (dispatch) => {
    try {
        //sign up the user
        const { data } = await API.signup(formData);
        dispatch({ type: 'AUTH', payload: data })
        history.push('/')
    } catch (error) {
        console.log(error);
    }
}