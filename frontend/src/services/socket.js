import { io } from "socket.io-client"

const SOCKET_URL = "http://localhost:7000";

// connect to backend
const socket = io(SOCKET_URL);

export default socket;