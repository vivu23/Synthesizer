import React from 'react';

export default (state, action) => {
    switch(action.type) {
        case 'AUTH':
            return {
                isLoggedIn: true
            }
        case 'NOTAUTH':
            return {
                isLoggedIn: false
            }
        default:
            return state;
    }
 }