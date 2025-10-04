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
    const uploadedImages = req.files.map(file => file.path);
    const { name, description, category, price, discount, offerPrice } = req.body;
    const product = await Product.findByIdAndUpdate(id, {
      $set : {
        images : uploadedImages,
        name,
        description,
        category,
        price : Number(price),
        discount : discount === "true" ? true : false,
        offerPrice : Number(offerPrice)
      }
    }, { new : true });
    res.json({ success : true, message : 'Product updated Sucessfully!' })
  } catch (error) {
    res.json({ success : false, message : error.message })
  }
}
