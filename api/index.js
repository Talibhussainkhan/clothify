import express from 'express';
import 'dotenv/config';
import authRouter from './routes/adminAuth.js';
import { connectDB } from './config/db.js';
import productRouter from './routes/productRoutes.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;

connectDB();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use('/api/auth', authRouter);
app.use('/api/product', productRouter);


app.listen(port, ()=>{
 console.log(`Server started at ${port}`)
})
