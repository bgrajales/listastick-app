
export const loginReducer = (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            localStorage.setItem('token', action.payload.user.token);

            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.user.token
            }
            
        case 'LOGOUT':
            localStorage.clear()
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                role: null,
                token: null
            }
        default:
            return state
    }
}