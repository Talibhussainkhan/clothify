import Product from "../models/product.js";

export const addProduct = async (req, res) =>{
    try {
      const uploadedImages = req.files.map(file => file.path);
      const { name, description, category, price, discount, offerPrice } = req.body;
       const product = new Product({
        images : uploadedImages,
        name,
        description,
        category,
        price : Number(price),
        discount : discount === "true" ? true : false,
        offerPrice : Number(offerPrice)
      });
      await product.save();
      if(product){
        return res.json({ success : true, message : 'Product created successfully!' })
      }
    } catch (error) {
        res.json({ success : false, error : error.message })
    }
}

export const getAllProductForAdmin = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ success : true, products });
  } catch (error) {
    res.json({ success : false, error : error.message })
  }
}

export const getDeleteProductById = async (req, res)=>{
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if(product){
      res.json({ success : true, message : 'Product Deleted Successfully' });
    }else{
      res.json({ success : false, message : 'Product not found!' });
    }
  } catch (error) {
    res.json({ success : false, error: error.message })
  }
}

export const getProductById = async (req, res) =>{
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if( !product ) return res.json({ success : false, message : 'Product not Found!' });
    res.json({ success : true, product })
  } catch (error) {
    res.json({ success : false, message : error.message })
  }
}

export const updateProductById = async (req, res) =>{
  try {
    const { id } = req.params;
     const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const uploadedImages = req.files && req.files.length > 0 
      ? req.files.map(file => file.path) 
      : existingProduct.images;

     const updateData = {
      images: uploadedImages,
      name: req.body.name || existingProduct.name,
      description: req.body.description || existingProduct.description,
      category: req.body.category || existingProduct.category,
      price: req.body.price ? Number(req.body.price) : existingProduct.price,
      discount: req.body.discount ? req.body.discount === "true" : existingProduct.discount,
      offerPrice: req.body.offerPrice ? Number(req.body.offerPrice) : existingProduct.offerPrice
    };
    const updatedProduct = await Product.findByIdAndUpdate(id, { $set: updateData }, { new: true });
    res.json({ success : true, message : 'Product updated Sucessfully!', updatedProduct })
  } catch (error) {
    res.json({ success : false, message : error.message })
  }
}
