import React from 'react';

export default (state, action) => {
    switch(action.type) {
        case 'AUTH':
            return {
                isLoggedIn: true
            }
        case 'NOTAUTH':
            return {
                isLoggedIn: true
            }
        default:
            return state;
    }
 }