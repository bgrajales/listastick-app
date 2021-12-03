
export const loginReducer = (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            localStorage.setItem('token', action.payload.user.token);
            localStorage.setItem('user', JSON.stringify(action.payload.user));

            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.user.token,
                refreshToken: action.payload.user.refreshToken
            }
            
        case 'LOGOUT':
            localStorage.clear()
            
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                role: null,
                token: null,
                refreshToken: null
            }
        case 'REFRESH_TOKEN_SUCCESS':
            localStorage.setItem('token', action.payload.token);
            
            return {
                ...state,
                token: action.payload.token,
                refreshToken: action.payload.refreshToken
            }
        case 'REFRESH_TOKEN_FAILURE':
            localStorage.clear()

            return {
                ...state,
                isAuthenticated: false,
                user: null,
                role: null,
                token: null,
                refreshToken: null
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