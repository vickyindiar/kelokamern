import { SET_AUTH, ERR_AUTH, TOOGLE_LOADING, SET_FIRST_LOAD} from '../types/authType';
import setAuthToken from '../helper/setAuthToken';
import axios from 'axios';
import isEmpty from '../helper/isEmpty';
import config from '../../config';

export const setAuthentication = (decode) => {
    return { 
        type: SET_AUTH,
        payload : decode 
    }
}

export const register = (data, history) => dispatch => {
    let haeder = {
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
          },
    }
    let paramaters = {
        "name" : data.name,
        "email": data.email,
        "password": data.password,
        "role_id": 2,
        "address": 'bekasi',
        "phone": '08123456789'
    }
    axios.post(`${config.apiURL}auth/register`, paramaters, haeder)
    .then(res => {
        if(res.data.status){
            let token = `Bearer ${res.data.token}`;
            localStorage.setItem('jwt', token);
            setAuthToken(token);    
            dispatch({ type: TOOGLE_LOADING, payload: false});
            dispatch(setAuthentication(res.data.user));
            history.push('/'); 
        }
        else{
            dispatch({ type: ERR_AUTH, payload: res.data.msg });
        }
    })
    .catch(err => {
        dispatch({ type: ERR_AUTH, payload: err });
    });
}

export const login = (data, history) => dispatch =>{
    let header = {
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
          },
    }
    let paramaters = {
        "email": data.email,
        "password": data.password,
    }
    axios.post(`${config.apiURL}auth/login`, paramaters, header)
    .then(res =>{
        if(res.data.token){
            let token = `Bearer ${res.data.token}`;
            localStorage.setItem('jwt', token);
            setAuthToken(token);      
            dispatch({type: TOOGLE_LOADING, payload: false});
            dispatch({type: SET_AUTH, payload: { user : { ...res.data } } });
            history.push('/');

            // header = { headers: { Authorization: token } }
            // axios.get(`${config.apiURL}user`, header)
            //     .then((response) => {
            //         if(response.data){
            //             dispatch({ type: SET_AUTH, payload: { user : { ...response.data } } });
            //             history.push('/');
            //         }
            //         else{
            //             dispatch({ type: SET_AUTH, payload: { user : { } } });
            //             history.push('auth/login');
            //         }
            //     })
            //     .catch(err => {
            //         if(isEmpty(err.response)){ console.log('server offline, contact your provider !'); return false;  }
            //     })
        }
        else{
            dispatch({ type: ERR_AUTH, payload: res.data.msg });
        }
    })
    .catch(err => {  
          dispatch({ type: ERR_AUTH, payload: err });
    });
}

export const logout = (token, history) => dispatch =>{
    try {
        let header = {
            headers: {
                Authorization: token,
                'Content-Type': 'application/vnd.api+json',
              }
        }
        axios.delete(`${config.apiURL}logout`, header)
        .then(res =>{  
                localStorage.removeItem('jwt');
                setAuthToken();
                dispatch(setAuthentication({}));
                history.push('/login');
        })
        .catch(err => {
            dispatch({ type: ERR_AUTH, payload: err });
        });
    } catch (err) {
        dispatch({ type: ERR_AUTH, payload: err.message });
    }
}

export const setAuthenticatedUser = (token, history, location) => dispatch => {
    let header = {
        headers: {
            Authorization: token
          }
    }
    axios.get(`${config.apiURL}user`, header)
        .then(res =>{
            if(res.data){
                dispatch(setAuthentication(res.data));
                history.push(location);
            }else{
                dispatch({ type: ERR_AUTH, payload: res.data.status });
            }
        })
        .catch(err => {
            dispatch({ type: ERR_AUTH, payload: err });
    });
}


export const AuthorizationCheck = (history, location) => dispatch => {
    let token = localStorage.getItem('jwt');
    let isValid = (!isEmpty(token));
    if (isValid) {
        let header = { headers: { Authorization: token } }
        axios.post(`${config.apiURL}auth/check`, {},  header)
            .then((response) => {
                if(response.data){
                    dispatch({ type: SET_AUTH, payload: { user : { ...response.data } } });
                    dispatch({ type: SET_FIRST_LOAD, payload: false});
                    history.push(location);
                }
                else{
                    dispatch({ type: SET_AUTH, payload: { user : { } } });
                    dispatch({ type: SET_FIRST_LOAD, payload: false});
                    history.push('/login');
                }
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: SET_FIRST_LOAD, payload: false});
                history.push('/login');
            })
    }
    else {
            dispatch({ type: SET_AUTH, payload: { user : { } } });
            dispatch({ type: SET_FIRST_LOAD, payload: false});
            history.push('/login');
    }

}