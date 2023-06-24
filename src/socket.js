import {io} from 'socket.io-client'


export const initSocket = async ()=>{
    const options = {
        'force new connection' : true,
        reconnectionAttempt : 'Infinity',
        timeout:10000,
        transports:['websocket'],
    };
    return io(import.meta.env.VITE_REACT_APP_BACKEND_URL, options)    // process.env.REACT_APP_BACKEND_URL ---> the url where server.js is lestining

    // this will return the instances // object of client socket
} 
