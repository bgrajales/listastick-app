import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { apiUrl } from '../../utils/apiUrl'
import Skeleton from '@mui/material/Skeleton';
import DoneIcon from '@mui/icons-material/Done';

import { AuthContext } from '../../routers/AppRouter'
import { todosReducer } from '../../reducers/todosReducer'
import { SearchBar } from '../appComponents/uiElements/SearchBar'
import { TaskCard } from '../appComponents/uiElements/TaskCard'
import { Pagination } from '../appComponents/uiElements/Pagination'
import { ExpandedTaskModal } from '../appComponents/modals/ExpandedTaskModal'

export const TodoContext = createContext()

const filters = Object.freeze({
    ALL: 'ALL',
    DAY: 'DAY',
    BY_DATE: 'BY_DATE',
})

const initialState = {
    todos: [],
    isFetching: false,
    hasError: false,
}

const initialShowTask = {
    todo: null,
    show: false
}

export const HomeScreen = () => {

    const skeletons = [1,2,3,4,5,6,7,8]

    const navigate = useNavigate()
    const { state: authState, dispatch: authDispatcher } = useContext(AuthContext)
    const [ state, dispatch ] = useReducer(todosReducer, initialState)
    const [ searchParams ] = useSearchParams();

    const [showTask, setShowTask] = useState(initialShowTask)

    const page = searchParams.get('page') || 1
    const filter = searchParams.get('filter') || filters.ALL
    const order = searchParams.get('order')
    const completed = searchParams.get('completed') || 'true'
    
    useEffect(() => {
        if (authState.token) {
            
            dispatch({
                type: 'FETCH_TODOS_REQUEST',
            })

            fetch(apiUrl(`todos?page=${page}&filter=${filter}&order=${order}&completed=${completed}`), {
                method: 'GET',
                headers: {
                    'Authorization': authState.token,
                    'Content-Type': 'application/json',
                }
            }).then(res => {
                if(res.ok) {
                    return res.json()
                } else {
                    throw res
                }
            }).then(data => {
                 dispatch({
                    type: 'FETCH_TODOS_SUCCESS',
                    payload: data,
                })
            }).catch(err => {
                console.error('Error en fetch de todos', err)

                if (err.status === 401) {
                    
                    fetch(apiUrl('refresh'), {
                        method: 'POST',
                        body: JSON.stringify({
                            refreshToken: authState.refreshToken
                        }),
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }).then(res => {
                        if(res.ok) {
                            return res.json()
                        } else {
                            throw res
                        }
                    }).then(data => {
                        authDispatcher({
                            type: 'REFRESH_TOKEN_SUCCESS',
                            payload: data,
                        })
                    }
                    ).catch(err => {
                        console.error('Error en refresh de token', err)
                        authDispatcher({
                            type: 'REFRESH_TOKEN_FAILURE',
                        })
                        localStorage.clear()
                        navigate('/auth/login')
                    })

                } else if (err.status === 403) { //403 = Forbidden implementar
                    navigate('/forbidden')
                } else {
                    dispatch({
                        type: 'FETCH_TODOS_FAILURE',
                    })
                }
            })
        }
    }, [authState.token, authState.refreshToken, authDispatcher, page, filter, order, completed, navigate])

    

    const handleSeeMore = (todo) => {
        setShowTask({
            todo,
            show: true
        })
    }

    const handleExpandedTaskClose = () => {
        setShowTask({
            todo: null,
            show: false
        })
    }

    return (
        <div className="app__body">
            <div className="container">
                <SearchBar />
                
                <div className="app__taskSection">
                    {state.isFetching === false && state.todos.length > 0 && 
                            state.todos.map(todo => (
                                <TaskCard key={todo.id} todo={todo} handleSeeMore={handleSeeMore} />
                            ))
                    }

                    <div className={`app__skeletonsDiv ${!state.isFetching ? '' : 'd-none'}`}>
                    {state.isFetching && 
                        skeletons.map(skeleton => (
                            <Skeleton key={skeleton} variant="rectangular" animation="wave" height={150} style={{borderRadius: 10}}/>
                        ))                    
                    }
                    </div>

                </div>

                { !state.isFetching && state.todos.length === 0 &&
                        <div className="app__noTasks">
                            <h2>
                                {
                                    completed === false 
                                    ? 'No Incomplete Tasks'
                                    : filter === filters.ALL
                                    ? 'No Tasks added yet'
                                    : filter === filters.DAY
                                    ? 'No Tasks today'
                                    : 'No tasks'
                                }
                            </h2>
                            <p>You don't have any tasks yet. Add one by clicking "+" button on the nav bar.</p>
                            <DoneIcon />
                        </div>
                }

                {
                    showTask.show &&
                    <ExpandedTaskModal show={showTask.show} todo={ showTask.todo } handleExpandedTaskClose={handleExpandedTaskClose}/>
                }

                <Pagination length={state.total}/>
            </div>
        </div>
    )
}
