
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
        case 'CHANGE_THEME':
            return {
                ...state,
                user: {
                    ...state.user,
                    settings: {
                        ...state.user.settings,
                        theme: action.payload
                    }
                }
            }
        case 'CHANGE_PFP':
            return {
                ...state,
                user: {
                    ...state.user,
                    settings: {
                        ...state.user.settings,
                        profileImage: action.payload
                    }
                }
            }
        default:
            return state
    }
}