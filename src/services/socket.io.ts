import io from 'socket.io-client';


let baseURL = 'https://3d35-201-15-38-159.ngrok.io';

const socketio = io(baseURL);

console.log(socketio);
console.log('executou');
export default socketio;