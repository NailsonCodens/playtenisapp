import io from 'socket.io-client';


let baseURL = 'https://5c5f-201-15-38-159.ngrok.io';

const socketio = io(baseURL);
export default socketio;
