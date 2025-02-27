import {INIT_LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS} from '../types'

const initialState = {
    loading: false,
    error: false,
    isAuthenticated: false,
}

export const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case INIT_LOGIN:
            return {...state, loading: true}
        case LOGIN_SUCCESS:
            return {...state, loading: false, isAuthenticated: true}
        case LOGIN_FAILURE:
            return {...state, loading: false, error: true}
        default:
            return state
    }
}