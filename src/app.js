import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import config from "./config";
import TasksRoutes from './routes/tasks.routes';
import TaskTipoEquipo from './routes/tipoequipo.routes'
import TaskEstadoEquipo from './routes/estadoequipo.routes'
import Taskusuarios from './routes/usuarios.routes'
import Taskmarcas from './routes/marcas.routes'
import Taskinventario from './routes/inventario.routes'
// MÓDULO AUTENTICACIÓN & AUTORIZACIÓN
const auth = require('./routes/auth')

// app contiene la dependencia express

// creamos y cofiguramos  servidor con express
const dotenv = require('dotenv').config();
const app = express();

// coonfiguracion puerto
app.set('port', config.port || 5000);

//middlewares, morgan nos sirve para mostrar por consola las peticiones htpp
// express.json nos permite reconocer que el objeto que recibimos es JSON
// cors nos permite extender la app de diferentes servidoress

//const corsOptions = { origin: 'http://localhost:5000'}
//app.use(cors(corsOptions));

//const cors = require('cors');
app.use(cors());

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false})); // permite entender si la peticion viene de un from en html


// routes
// simplemente damos una respuesta JSON a la direccion raiz 'localhost:3000' 
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a la APP' });
});

// invocamos los modulos de cada CRUD
app.use('/api/tasks', TasksRoutes);
app.use('/api/tasks', TaskTipoEquipo)
app.use('/api/task', TaskEstadoEquipo)
app.use('/api/users',Taskusuarios)
app.use('/api/brands', Taskmarcas)
app.use('/api/inventory', Taskinventario)


app.use('/api/auth', auth)

export default app;
