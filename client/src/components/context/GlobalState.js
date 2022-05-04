import React, { createContext, useReducer}from 'react';
import AppReducer from './AppReducer'

const initialState = {
    isLoggedIn: false
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    function login(status){
        dispatch({
            type: 'AUTH',
            payload: status
        });
    }

    function logout(status){
        dispatch({
            type: 'NOTAUTH',
            payload: status
        })
    }

    return(
        <GlobalContext.Provider value = {{isLoggedIn: state.isLoggedIn, login, logout}}>
            {children}
        </GlobalContext.Provider>
    )
}
