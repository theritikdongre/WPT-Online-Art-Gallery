import express from 'express';
 import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectToDB from './utils/db.js';
 import userRoutes from './routes/user.route.js'
 import artRoutes from './routes/art.route.js'
// import companyRoutes from "./routes/compamy.route.js"
// import jobRoutes from "./routes/job.route.js"
// import applicationRoutes from "./routes/application.route.js"

dotenv.config({})
const app = express();


//
//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
}
app.use(cors(corsOptions));

const PORT =  process.env.PORT || 3000;

app.use('/api/v1/user' , userRoutes)
app.use('/api/v1/art' , artRoutes)


app.listen(PORT, () => {
    connectToDB()
    console.log(`Server is running on port ${PORT}`);
    });
