import {config} from 'dotenv'
config();

// usamos el modulo dotenv el que nos permite darle seguridad a las conexiones importantes como la ruta de la bd o puerto en un archivo .env

export default {
    mongodbURL: process.env.MONGODB_URI,
};