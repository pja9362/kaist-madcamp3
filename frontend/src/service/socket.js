import { createContext } from "react";
import { io } from "socket.io-client";

export const SOCKET_SEND = {
  MESSAGE: "message",
  ROOM_IN: "enter-room",
  ROOM_OUT: "exit-room",
  USER_LIST: "get-user-list",
};
export const SOCKET_RECEIVE = {
  CONNECT: "user-connected",
  DISCONNECT: "user-disconnected",
  USER_LIST: "user-list",
  USER_IN: "user-entered",
  MESSAGE: "message"
};
export const SOCKET_URL = 'http://172.10.5.147:80/chat';