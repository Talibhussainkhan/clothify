import express from 'express';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());




app.listen(port, ()=>{
 console.log(`Server started at ${port}`)
})
