import React, { createContext, useContext, useEffect, useState, useReducer}from 'react';
import AppReducer from './AppReducer';


const initialState = {
    isLoggedIn: false, 
    synth: null
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
    function createSynth(){
        dispatch({
            type: 'SYNTH',
            payload: null
        })
    }

    return(
        <GlobalContext.Provider value = {{isLoggedIn: state.isLoggedIn, synth: state.synth, createSynth,login, logout}}>
            {children}
        </GlobalContext.Provider>
    )
}
