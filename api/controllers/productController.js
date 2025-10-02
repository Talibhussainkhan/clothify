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