import express from 'express';
import { addProduct } from '../controllers/productController.js';
import { upload } from '../config/multer.js';

const productRouter = express.Router();

productRouter.post('/create', upload.array('images') ,addProduct);



export default productRouter;