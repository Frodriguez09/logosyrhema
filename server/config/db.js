const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB conectado ✅');

        // Keepalive: ping cada 5 minutos para evitar pausa en M0
        setInterval(async () => {
            try {
                await mongoose.connection.db.admin().ping();
            } catch (e) {
                console.error('Keepalive ping falló:', e.message);
            }
        }, 5 * 60 * 1000);

    } catch(error) {
        console.error('Error de conexion:', error);
        process.exit(1);
    }
};

module.exports = connectDB;