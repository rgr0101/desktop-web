const app = require('./src/app');
const connectDB = require('./src/config/dbConfig');

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
