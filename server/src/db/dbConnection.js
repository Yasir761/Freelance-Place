import mongoose from "mongoose";

const dbConnection = async ()=>{
    try {
        const dbConnection = await mongoose.connect(process.env.MONGODB_URI+process.env.DB_NAME);
        console.log("Database is connected sucessfully 🏆 at Host: ", dbConnection.connection.port)
        return dbConnection

    } catch (error) {
        console.log("Oops!! ☹️   Database Connectino Failed", error);
        process.exit(1);
    }
}

export default dbConnection