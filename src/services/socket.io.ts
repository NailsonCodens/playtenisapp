import io from 'socket.io-client';


let baseURL = 'https://426b-201-14-34-109.ngrok-free.app/';

const socketio = io(baseURL);
export default socketio;
