import React, { useContext, useEffect, useReducer } from 'react'
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';
import { todosReducer } from '../../reducers/todosReducer';
import { AuthContext } from '../../routers/AppRouter';
import { apiUrl } from '../../utils/apiUrl';
import { ImportanceTasksGraph } from '../appComponents/statsElements/ImportanceTasksGraph';
import { TotalCompletedTasks } from '../appComponents/statsElements/TotalCompletedTasks';


const data = [
    {
      name: '18-24',
      uv: 31.47,
      pv: 2400,
      fill: '#8884d8',
    },
    {
      name: '25-29',
      uv: 26.69,
      pv: 4567,
      fill: '#83a6ed',
    },
    {
      name: '30-34',
      uv: 15.69,
      pv: 1398,
      fill: '#8dd1e1',
    },
    {
      name: '35-39',
      uv: 8.22,
      pv: 9800,
      fill: '#82ca9d',
    },
    {
      name: '40-49',
      uv: 8.63,
      pv: 3908,
      fill: '#a4de6c',
    },
    {
      name: '50+',
      uv: 2.63,
      pv: 4800,
      fill: '#d0ed57',
    },
    {
      name: 'unknow',
      uv: 6.67,
      pv: 4800,
      fill: '#ffc658',
    },
  ];
  
  const style = {
    top: '50%',
    right: 0,
    transform: 'translate(0, -50%)',
    lineHeight: '24px',
  };

  
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
                    <div>
                        <h3>Total completed tasks</h3>
                    </div>
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
