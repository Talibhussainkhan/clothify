import express from 'express';
import { addProduct, getAllProductForAdmin, getDeleteProductById, getProductById } from '../controllers/productController.js';
import { upload } from '../config/multer.js';

const productRouter = express.Router();

productRouter.post('/create', upload.array('images') ,addProduct);
productRouter.get("/get", getAllProductForAdmin);
productRouter.delete("/delete/:id", getDeleteProductById);
productRouter.get('/get/:id', getProductById);


export default productRouter;