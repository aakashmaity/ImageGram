import { Server } from "socket.io";

let io;
const onlineUsers = new Map();

export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: [
                process.env.FRONTEND_APP_URL,
                "http://localhost:3000",
                "https://imagegram-frontendddd.vercel.app",
            ],
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        console.log("⚡ User connected:", socket.id);

        socket.on("registerUser", (userId) => {
            onlineUsers.set(userId, socket.id);
            console.log(`✅ User ${userId} registered with socket ${socket.id}`);
        });

        socket.on("disconnect", () => {
            for (const [userId, sockId] of onlineUsers.entries()) {
                if (sockId === socket.id) {
                    onlineUsers.delete(userId);
                    console.log(`❌ User ${userId} disconnected`);
                    break;
                }
            }
        });
    });

    return io;
};

export const sendNotification = (receiverId, data) => {
    if (!io) return;
    const socketId = onlineUsers.get(receiverId?.toString?.() || receiverId);
    if (socketId) {
        io.to(socketId).emit("getNotification", data);
        console.log(`📨 Notification sent to ${receiverId}:`, data);
    }
};

export const getIo = () => io;

