export const todosReducer = (state = {}, action) => {
    switch (action.type) {
        case 'FETCH_TODOS_REQUEST':
            return {
                ...state,
                isFetching: true,
                hasError: false,
            }
        case 'FETCH_TODOS_SUCCESS':
            return {
                ...state,
                isFetching: false,
                todos: action.payload.todos,
                total: action.payload.total
            }
        case 'FETCH_TODOS_FAILURE':
            return {
                ...state,
                isFetching: false,
                hasError: true,
            }
        case 'FETCH_CALENDAR_SUCCESS':
            return {
                ...state,
                isFetching: false,
                todos: action.payload.todos,
            }
        default:
            return state
    }
} 