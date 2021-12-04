import { apiUrl } from '../utils/apiUrl'
import axios from 'axios'

export const userLogin = ( user, dispatch, navigate, setLoginError, data ) => {

    const headers = {
        'Content-Type': 'application/json'
    }

    axios.post( apiUrl('login'), JSON.stringify(user), {
        headers: headers
    }).then(response => {
        console.log(response)
        if(response.status === 200) {
            dispatch({
                type: 'LOGIN',
                payload: response.data
            })
    
            navigate('/app/home')
        } else {
            setLoginError(true)
            throw new Error('Something went wrong')
        }
    }).catch(error => {
        console.log(error)

        return ({
            ...data,
            isSubmitting: false,
            errorMessage: 'Crendenciales Invalidas'
        })
    })

}

export const userRegister = ( user, dispatch, navigate, setRegisterError, data ) => {

    const headers = {
        'Content-Type': 'application/json'
    }

    axios.post( apiUrl('register'), JSON.stringify(user), {
        headers: headers
    }).then(response => {
        console.log(response)
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
        console.log(error)
        setRegisterError(true)
        return ({
            ...data,
            isSubmitting: false,
            errorMessage: 'Crendenciales Invalidas'
        })
    })

    // fetch(apiUrl('register'), {

    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       name: data.name,
    //       email: data.email,
    //       password: data.password
    //     })

    //   }).then(res => {
    //     if (res.ok) {
    //       return res.json()
    //     } else {
    //       setRegisterError(true)
    //       throw res
    //     }
    //   }).then(data => {
    //     dispatch({
    //       type: 'LOGIN',
    //       payload: data
    //     })
    //     navigate('/app/home')
    //   }).catch(err => {
    //     setRegisterError(true)
    //     data = ({
    //       ...formValues,
    //       isSubmitting: false,
    //       errorMessage: 'No se pudo crear el usuario'
    //     })
    //   })
}
export const changeUserSettings = ( jwsToken, userID, newSettings, dispatch ) => {

    const headers = {
        authorization: jwsToken,
        'Content-Type': 'application/json'
    }
    console.log(newSettings)
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