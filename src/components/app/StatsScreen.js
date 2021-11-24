import React, { useContext, useEffect, useReducer } from 'react'

import { todosReducer } from '../../reducers/todosReducer';
import { AuthContext } from '../../routers/AppRouter';
import { apiUrl } from '../../utils/apiUrl';
import { ImportanceTasksGraph } from '../appComponents/statsElements/ImportanceTasksGraph';
import { TotalCompletedTasks } from '../appComponents/statsElements/TotalCompletedTasks';

const initialState = {
    todos: [],
    isFetching: false,
    hasError: false,
}

export const StatsScreen = () => {

    const { state: authState } = useContext(AuthContext)
    const [ state, dispatch ] = useReducer(todosReducer, initialState)

    useEffect(() => {
        if(authState.token) {
            dispatch({ type: 'FETCH_TODOS_REQUEST' })

            fetch(apiUrl('/todosStats'), {
                method: 'GET',
                headers: {
                    'authorization': authState.token,
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                if(res.ok) {
                    return res.json()
                } else {
                    throw new Error('Something went wrong')
                }
            }).then(data => {
                console.log(data)
                dispatch({ type: 'FETCH_TODOS_SUCCESS', payload: data })
            }).catch(err => {
                dispatch({ type: 'FETCH_TODOS_FAILURE' })
            })
        }
    }, [authState.token])

    return (
        <div className="app__body container stats__body">

        {   (state.todos.length > 0) ?
            <>
                <div className="stats__block">
                    <TotalCompletedTasks todos={state.todos}/>
                </div>

                <div className="stats__block">
                    <ImportanceTasksGraph todos={state.todos} />
                </div>
                </>
            : ''
        }
            
            </div>
    )
}
