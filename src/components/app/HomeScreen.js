import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { todosReducer } from '../../reducers/todosReducer'
import { AuthContext } from '../../routers/AppRouter'
import { apiUrl } from '../../utils/apiUrl'

import { SearchBar } from '../appComponents/SearchBar'
import { TaskCard } from '../appComponents/TaskCard'

export const TodoContext = createContext()

// const filters = Object.freeze({
//     ALL: 'ALL',
//     DAY: 'DAY',
//     HIGH_PRIORITY: 'HIGH_PRIORITY',
// })

const initialState = {
    todos: [],
    isFetching: false,
    hasError: false,
}

export const HomeScreen = () => {

    const { state: authState } = useContext(AuthContext)
    const [ state, dispatch ] = useReducer(todosReducer, initialState)

    useEffect(() => {
        if (authState.token) {
            dispatch({
                type: 'FETCH_TODOS_REQUEST',
            })

            fetch(apiUrl('todos'), {
                headers: {
                    'Authorization': authState.token,
                    'Content-Type': 'application/json'
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
                console.log(err)

                dispatch({
                    type: 'FETCH_TODOS_FAILURE',
                })
            })
        }
    }, [authState.token])

    return (
        <div className="app__body">
            <div className="container">
                <SearchBar />
                
                <div className="app__taskSection">
                    {state.todos.length > 0 &&
                            state.todos.map(todo => (
                                <TaskCard key={todo.id} todo={todo} />
                            ))
                    }
                </div>
            </div>
        </div>
    )
}
