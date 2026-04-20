import { io } from "socket.io-client";

let socket: ReturnType<typeof io>;

export const initSocket = () => {
    if (!socket) {
        socket = io(process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000", {
            transports: ["websocket"], // better for RN
        });
    }
    return socket;
};

export const getSocket = () => initSocket();
