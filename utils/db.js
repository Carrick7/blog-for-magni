import mongoose from 'mongoose';

const connection = {};

async function connect() {
    if (connection.isConnected) {
        console.log('Already Connected');
        return;
    }
    if (mongoose.connections.length > 0) {
        mongoose.set('strictQuery', true);
        connection.isConnected = mongoose.connections[0].readyState;
            if (connection.isConnected === 1) {
                console.log('Connected Previous Connection'); 
                return;
            }
            await mongoose.disconnect();
    }
    const db = 
    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("New Connection")
    connection.isConnected = db.connections[0].readyState;
}

async function disconnect(){
    if (connection.isConnected){
        if(process.env.NODE_ENV === 'production'){
            await mongoose.disconnect();
            connection.isConnected = false;
        }
        else{
            console.log("Not Disconnected")
        }
    }
}

const db = { connect, disconnect };
export default db;