import express from 'express';
import 'dotenv/config';
import authRouter from './routes/adminAuth.js';
import { connectDB } from './config/db.js';

const app = express();
const port = process.env.PORT || 5000;

connectDB();

// Middleware
app.use(express.json());
app.use('/api/auth', authRouter);


app.listen(port, ()=>{
 console.log(`Server started at ${port}`)
})
