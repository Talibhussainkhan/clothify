import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    images : { type : Array, required : true },
    name : { type : String, required : true },
    description : { type : String, required : true },
    category : { type : String, required : true },
    price : { type : Number, required : true },
    discount : Boolean,
    offerPrice : Number
},{
    timestamps : true
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;