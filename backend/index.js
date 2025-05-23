import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './app/router.js';

//* Initialization
const app = express();

//* Configuration

const host = '0.0.0.0';
const port = 3000;


//* Configure CORS 
app.use(cors());

//* Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//* Routes
router(app);

//* Start server
app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
});
