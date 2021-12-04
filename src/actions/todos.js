import { apiUrl } from '../utils/apiUrl'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const fetchHomeTodos = ( page, filter, order, completed, search, jwsToken, jwsRefreshToken, dispatch, authDispatcher, navigate ) => {

    axios.get(apiUrl(`todos?page=${page}&filter=${filter}&order=${order}&completed=${completed}&search=${search}`), {
        headers: {
            'Authorization': jwsToken,
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.status === 200) {
            dispatch({ type: 'FETCH_TODOS_SUCCESS', payload: response.data })
        } else {
            dispatch({ type: 'FETCH_TODOS_FAILURE' })
        }
    }).catch(error => {

        if (error.response.status === 401) {
            
            axios.get(apiUrl('refresh'), { //Enviar esto a una funcion que se encargue de refrescar el token
                headers: {
                    'Authorization': jwsRefreshToken,
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.status === 200) {
                    authDispatcher({ type: 'REFRESH_TOKEN_SUCCESS', payload: response.data })
                } else {
                    authDispatcher({ type: 'REFRESH_TOKEN_FAILURE' })
                    localStorage.clear()
                    navigate('/auth/login')
                }
            }).catch(error => {
                authDispatcher({ type: 'REFRESH_TOKEN_FAILURE' })
                navigate('/auth/login')
            })

        } else if (error.response.status === 403) {
            navigate('/forbidden')
        } else {
            dispatch({ type: 'FETCH_TODOS_FAILURE' })
        }
    })

}

export const fetchStatsTodos = ( jwsToken, jwsRefreshToken, dispatch, authDispatcher, navigate ) => {

    axios.get( apiUrl('/todosStats'), {
        headers: {
            'authorization': jwsToken,
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.status === 200) {
            dispatch({ type: 'FETCH_TODOS_SUCCESS', payload: response.data })
        } else {
            dispatch({ type: 'FETCH_TODOS_FAILURE' })
        }
    }).catch(error => {
        console.log(error)

        if (error.response.status === 401) {
            
            axios.get(apiUrl('refresh'), { //Enviar esto a una funcion que se encargue de refrescar el token
                headers: {
                    'Authorization': jwsRefreshToken,
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.status === 200) {
                    authDispatcher({ type: 'REFRESH_TOKEN_SUCCESS', payload: response.data })
                } else {
                    authDispatcher({ type: 'REFRESH_TOKEN_FAILURE' })
                    localStorage.clear()
                    navigate('/auth/login')
                }
            }).catch(error => {
                console.log(error)
                authDispatcher({ type: 'REFRESH_TOKEN_FAILURE' })
                localStorage.clear()
                navigate('/auth/login')
            })

        } else if (error.response.status === 403) {
            navigate('/forbidden')
        } else {
            dispatch({ type: 'FETCH_TODOS_FAILURE' })
        }
    })

}

export const fetchCalendarTodos = ( startDate, endDate, jwsToken, dispatch ) => {

    axios.get( apiUrl(`todosCalendar?startDate=${startDate}&endDate=${endDate}`), {
        headers: {
            'authorization': jwsToken,
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.status === 200) {
            dispatch({ type: 'FETCH_CALENDAR_SUCCESS', payload: response.data })
        } else {
            dispatch({ type: 'FETCH_CALENDAR_FAILURE' })
        }
    }).catch(error => {
        console.log(error)
    })

    // fetch(apiUrl(`todosCalendar?startDate=${calendarDates.startDate}&endDate=${calendarDates.endDate}`), {
    //     method: 'GET',
    //     headers: {
    //         'authorization': authState.token,
    //         'Content-Type': 'application/json'
    //     }
    // }).then(res => {
    //     if (res.ok) {
    //         return res.json()
    //     } else {
    //         throw new Error('Something went wrong')
    //     }
    // }).then(data => {
    //     dispatch({
    //         type: 'FETCH_CALENDAR_SUCCESS',
    //         payload: data
    //     })
    // }).catch(err => {
    //     console.log(err)
    // })

}

export const addNewTask = async( data, jwsToken, setAddError ) => {

    let added
    
    const headers = {
        'Content-Type': 'application/json',
        'authorization': jwsToken
    }

    await axios.post(apiUrl('todos'), JSON.stringify(data), {
        headers: headers
    }).then(response => {
        if (response.status === 200) {
            added = {
                status: true
            }
        } else {
            added = {
                status: false
            }
        }
    }).catch(error => {
        setAddError({
            error: true,
            message: error.response.data.message
        })
        added = {
            status: false
        }
    })

    return added

}

export const changeStatusTask = ( todo, jwsToken, setCompleted, completed, setActionLoading ) => {

    const headers = {
        'Content-Type': 'application/json',
        authorization: jwsToken
    }

    axios.put(apiUrl(`todos/${todo.id}`), JSON.stringify({
        ...todo,
        completed: !todo.completed
    }), {
        headers: headers
    }).then(response => {
        console.log(response)
        setActionLoading(false)
        if (response.status === 200) {
            if (setCompleted) {
                setCompleted(!completed)
            }
            return response
        } else {
            console.log('error')
        }
    }).catch(error => {
        console.log(error)
        setActionLoading(false)
    })

}

export const deleteSelectedTask = ( todo, jwsToken, handleDeleted ) => {

    const MySwal = withReactContent(Swal)

    const headers = {
        'Content-Type': 'application/json',
        authorization: jwsToken
    }

    axios.delete(apiUrl(`todos/${todo.id}`), {
        headers: headers
    }).then(response => {
        console.log(response)
        if (response.status === 200) {
            MySwal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'Your task has been deleted.',
                showConfirmButton: false,
                timer: 1500
            })
            handleDeleted()
        } else {
            console.log('error')
        }
    }).catch(error => {
        console.log(error)
    })

}
