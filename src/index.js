import express from 'express';
import cors from 'cors';
import employeesRoutes from "./routers/store.routes.js";

const app = express();

// Configura CORS para permitir acceso desde http://localhost:4200 (Angular app)
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // algunos navegadores antiguos (IE11, varias SmartTVs) fallan con 204
};
app.use(cors(corsOptions));

// Middleware para manejar solicitudes JSON
app.use(express.json());

// Rutas de la API
app.use('/api', employeesRoutes);



app.get('/', (req, res) => {
  res.send('Servidor Iniciado!');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
