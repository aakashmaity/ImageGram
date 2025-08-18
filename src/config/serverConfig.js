import dotenv from "dotenv";

dotenv.config();

export const config = {
    db: {
        url: process.env.DB_URL,
        password: process.env.DB_PASSWORD,
    },
    server: {
        port: process.env.PORT || 3000,
        host: process.env.HOST
    },
}