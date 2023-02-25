import io from 'socket.io-client';


let baseURL = 'https://c5b8-201-15-38-159.ngrok.io';

const socketio = io(baseURL);
export default socketio;