import express from 'express';
import { addProduct, getAllProductForAdmin, getDeleteProductById } from '../controllers/productController.js';
import { upload } from '../config/multer.js';

const productRouter = express.Router();

productRouter.post('/create', upload.array('images') ,addProduct);
productRouter.get("/get", getAllProductForAdmin);
productRouter.delete("/delete", getDeleteProductById);



export default productRouter;