import { apiUrl } from '../utils/apiUrl'
import axios from 'axios'

export const userLogin = ( user, dispatch, navigate, setLoginError, setLoading ) => {

    const headers = {
        'Content-Type': 'application/json'
    }

    axios.post( apiUrl('login'), JSON.stringify(user), {
        headers: headers
    }).then(response => {
        setLoading(false)
        if(response.status === 200) {
            dispatch({
                type: 'LOGIN',
                payload: {
                    user: response.data.user,
                    token: response.data.token,
                    refreshToken: response.data.refreshToken            
                }
            })
            navigate('/app/home')
        } else {
            setLoginError(true)
            throw new Error('Something went wrong')
        }
    }).catch(error => {
        setLoginError(true)
        setLoading(false)
    })

}

export const userRegister = ( user, dispatch, navigate, setRegisterError, setLoading ) => {

    const headers = {
        'Content-Type': 'application/json'
    }

    axios.post( apiUrl('register'), JSON.stringify(user), {
        headers: headers
    }).then(response => {

        setLoading({
            status: false,
            message: ''
        })

        if(response.status === 200) {
            dispatch({
                type: 'LOGIN',
                payload: response.data
            })
    
            navigate('/app/home')
        } else {
            setRegisterError(true)
            throw new Error('Something went wrong')
        }

    }).catch(error => {
        setRegisterError(true)
        setLoading({
            status: false,
            message: error.response.data.message
        })
    })

}

export const changeUserSettings = ( jwsToken, userID, newSettings, dispatch ) => {

    const headers = {
        authorization: jwsToken,
        'Content-Type': 'application/json'
    }
    
    axios.put( apiUrl(`user/${userID}`), JSON.stringify(newSettings), {
        headers: headers   
    }).then(response => {
        console.log(response)
        if (response.status === 200) {
            dispatch({ type: 'CHANGE_THEME', payload: newSettings.settings.theme })
            JSON.parse(localStorage.setItem('user', JSON.stringify(response.data)));
        } else {
            console.log('Error')
        }
    }).catch(error => {
        console.log(error)
    })

}