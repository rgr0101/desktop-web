const mongoose = require('mongoose');

require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conectado a MongoDB Atlas');
    } catch (error) {
        console.error('Error al conectar a MongoDB Atlas:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
