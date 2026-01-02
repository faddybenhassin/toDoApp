import dotenv from 'dotenv';
dotenv.config();

export const jwtSecret = process.env.jwtSecret;
export const mongoURI = process.env.mongoURI;
export const port = process.env.port || 5000;
