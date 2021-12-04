import React, { useContext, useEffect, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchStatsTodos } from '../../actions/todos';

import { todosReducer } from '../../reducers/todosReducer';
import { AuthContext } from '../../routers/AppRouter';
import { ImportanceTasksGraph } from '../appComponents/statsElements/ImportanceTasksGraph';
import { TotalCompletedTasks } from '../appComponents/statsElements/TotalCompletedTasks';

const initialState = {
    todos: [],
    isFetching: false,
    hasError: false,
}

export const StatsScreen = () => {

    const navigate = useNavigate()
    const { state: authState, dispatch: authDispatcher } = useContext(AuthContext)
    const [ state, dispatch ] = useReducer(todosReducer, initialState)

    useEffect(() => {
        if(authState.token) {

            dispatch({ type: 'FETCH_TODOS_REQUEST' })

            fetchStatsTodos( authState.token, authState.refreshToken, dispatch, authDispatcher, navigate )
            
        }
    }, [authState.token, authState.refreshToken, navigate, dispatch, authDispatcher])

    console.log(state.todos.length)
    return (
        <div className="app__body container stats__body">

        {   (state.todos.length > 0) 
            ?<>
                <div className="stats__block">
                    <TotalCompletedTasks todos={state.todos}/>
                </div>

                <div className="stats__block">
                    <ImportanceTasksGraph todos={state.todos} />
                </div>
            </>
            :<>
                 <div className="app__noTasksStats">
                    <h2>
                        You have no tasks
                    </h2>
                    <p>You don't have any tasks yet. Add one by clicking "+" button on the nav bar.</p>
                </div>
            </>
        }
            
            </div>
    )
}
