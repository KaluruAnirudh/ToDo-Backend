import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);  // Encode password

const Connection = async () => {
    try {
        mongoose.set('strictQuery', false);  // Suppress warning

        const MONGODB_URI = `mongodb+srv://${USERNAME}:${PASSWORD}@mern-todo.5dxfo.mongodb.net/todoDB?retryWrites=true&w=majority`;

        await mongoose.connect(MONGODB_URI, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        });

        console.log('✅ Database connected Successfully');

        mongoose.connection.on('disconnected', () => {
            console.log('⚠️ Database disconnected');
        });

        mongoose.connection.on('error', (error) => {
            console.error('❌ Error while connecting with the database:', error.message);
        });

    } catch (err) {
        console.error('🚨 Connection Failed:', err.message);
    }
};

export default Connection;
