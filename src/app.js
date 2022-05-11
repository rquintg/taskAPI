import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import TasksRoutes from './routes/tasks.routes';

// app contiene la dependencia express

// creamos y cofiguramos  servidor con express
const app = express();

// coonfiguracion puerto
app.set('port', process.env.PORT || 3000);

//middlewares, morgan nos sirve para mostrar por consola las peticiones htpp
// express.json nos permite reconocer que el objeto que recibimos es JSON
// cors nos permite extender la app de diferentes servidoress

const corsOptions = { origin: 'http://localhost:3000'}
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false})); // permite entender si la peticion viene de un from en html


// routes
// simplemente damos una respuesta JSON a la direccion raiz 'localhost:3000' 
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a la APP' });
});

// invocamos las rutas del CRUD
app.use('/api/tasks', TasksRoutes);

export default app;
