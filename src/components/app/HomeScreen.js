import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { useSearchParams } from 'react-router-dom'
import { apiUrl } from '../../utils/apiUrl'

import { AuthContext } from '../../routers/AppRouter'
import { todosReducer } from '../../reducers/todosReducer'
import { SearchBar } from '../appComponents/SearchBar'
import { TaskCard } from '../appComponents/TaskCard'
import { Pagination } from '../appComponents/uiElements/Pagination'

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

export const HomeScreen = () => {

    const { state: authState } = useContext(AuthContext)
    const [ state, dispatch ] = useReducer(todosReducer, initialState)
    const [ searchParams ] = useSearchParams();
    
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
                console.log(err)

                dispatch({
                    type: 'FETCH_TODOS_FAILURE',
                })
            })
        }
    }, [authState.token, page, filter, order, completed])

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

                <Pagination length={state.meta}/>
            </div>
        </div>
    )
}
