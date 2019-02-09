import io from 'socket.io-client';

const socket = new io.connect(window.location.href.replace(/^http/, "ws"));
socket.on('connect_error', e => console.log("error"));
socket.on('connect', e => console.log("socket.io connection open"));

socket.emit('join', "Mark");
