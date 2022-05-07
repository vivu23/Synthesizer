import React from 'react';
import * as Tone from "tone";


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
        case 'SYNTH':
            return{
                synth: new Tone.Synth()
            }
        
            
        default:
            return state;
    }
 }