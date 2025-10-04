import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const fetchProductById = async (id) => {
  const res = await axios.get(`http://localhost:5000/api/product/get/${id}`);
  return res.data;
};

const updateProduct = async ({id, formData}) => {
  const res = await axios.put(`http://localhost:5000/api/product/update/${id}`, formData);
  return res.data;
}

const UpdateProject = () => {
  const [productData, setProductData] = useState({
    images: Array(4).fill(null),
    name: "",
    description: "",
    category: "",
    price: 0,
    discount: false,
    offerPrice: 0,
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: fetchData , isPending : fetchIsPending } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
  });

  const { mutate, isPending } = useMutation({
    mutationFn : updateProduct,
    onSuccess : (data)=>{
      if(data.success){
        toast.success(data.message);
        navigate('/admin/manage-product');
        queryClient.invalidateQueries({ queryKey: ['products'] });
      }else{
        toast.error(data.message)
      }
    }
  })

  useEffect(() => {
    if (fetchData) {
      setProductData({
        images: fetchData.product.images || Array(4).fill(null),
        name: fetchData.product.name || "",
        description: fetchData.product.description || "",
        category: fetchData.product.category || "",
        price: fetchData.product.price || 0,
        discount: fetchData.product.discount || false,
        offerPrice: fetchData.product.offerPrice || 0,
      });
    }
  }, [fetchData]);


  const handleImage = (e, index) => {
    const file = e.target.files[0];
      if (file) {
        const newImages = [...productData.images];
        newImages[index] = file;
        console.log(newImages);
        setProductData({ ...productData, images: newImages });
      }
  };

  const handleChange = (e) => {
    if (
      e.target.id === "name" ||
      e.target.id === "description" ||
      e.target.id === "category" ||
      e.target.id === "price" ||
      e.target.id === "offerPrice"
    ) {
      setProductData({ ...productData, [e.target.id]: e.target.value });
    }
    if (e.target.id === "discount") {
      setProductData({ ...productData, [e.target.id]: e.target.checked });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (productData.discount && productData.price < productData.offerPrice) {
      return toast.error("Offer price must be less than original price!");
    }

    const hasImage = productData.images.some((file) => file !== null);
    if (!hasImage) {
      toast.error("Please upload at least one product image!");
      return;
    }
    const formData = new FormData();

    productData.images.forEach((file) => {
      if (file) {
        formData.append("images", file);
      }
    });
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("category", productData.category);
    formData.append("price", productData.price);
    formData.append("discount", productData.discount);
    formData.append("offerPrice", productData.offerPrice);
    mutate({id, formData})
  }

  if(fetchIsPending){
    return (
      <div className="text-center text-2xl my-4">Loading...</div>
    )
  }

  return (
    <>
      <div className="flex flex-col justify-between">
        <h1 className="text-2xl text-slate-700 font-bold px-10">
          Update Products
        </h1>
        <form
            onSubmit={handleSubmit}
          className="md:px-10 p-4 flex flex-col sm:flex-row gap-4 max-w-6xl"
        >
          <div className="flex-1 flex flex-col gap-5">
            <div>
              <p className="text-base font-medium">Product Image</p>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                {Array(4)
                  .fill("")
                  .map((_, index) => (
                    <label key={index} htmlFor={`image${index}`}>
                      <input
                        onChange={(e) => handleImage(e, index)}
                        accept="image/*"
                        type="file"
                        id={`image${index}`}
                        hidden
                      />
                      <img
                        className="max-w-24 cursor-pointer"
                        src={
                          productData.images[index]
                            ? typeof productData.images[index] === "string"
                              ? productData.images[index] 
                              : URL.createObjectURL(productData.images[index]) 
                            : "/uploadArea.png" 
                        }
                        alt="uploadArea"
                        width={100}
                        height={100}
                      />
                    </label>
                  ))}
              </div>
            </div>
            <div className="flex flex-col gap-1 max-w-md">
              <label className="text-base font-medium" htmlFor="name">
                Product Name
              </label>
              <input
                id="name"
                type="text"
                value={productData.name}
                onChange={handleChange}
                placeholder="Type here"
                className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                required
              />
            </div>
            <div className="flex flex-col gap-1 max-w-md">
              <label className="text-base font-medium" htmlFor="description">
                Product Description
              </label>
              <textarea
                value={productData.description}
                onChange={handleChange}
                id="description"
                rows={4}
                className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
                placeholder="Type here"
              ></textarea>
            </div>
            <div className="flex flex-col gap-1 max-w-md">
              <label className="text-base font-medium" htmlFor="category">
                Category
              </label>
              <select
                onChange={handleChange}
                id="category"
                className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              >
                <option value="">Select Category</option>
                {[{ name: "Men" }, { name: "Women" }, { name: "Kids" }].map(
                  (item, index) => (
                    <option key={index} value={item.name}>
                      {item.name}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-5">
            <div className="flex gap-4">
              <input
                type="checkbox"
                id="discount"
                className="w-4"
                checked={productData.discount}
                onChange={handleChange}
              />
              <label htmlFor="discount">Discount</label>
            </div>
            <div className="flex items-center gap-5 flex-wrap">
              <div className="flex-1 flex flex-col gap-1 w-32">
                <label
                  className="text-base font-medium"
                  htmlFor="product-price"
                >
                  Product Price
                </label>
                <input
                  value={productData.price}
                  onChange={handleChange}
                  id="price"
                  type="number"
                  placeholder="0"
                  className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                  required
                />
              </div>
              {productData.discount && (
                <div className="flex-1 flex flex-col gap-1 w-32">
                  <label
                    className="text-base font-medium"
                    htmlFor="offer-price"
                  >
                    Offer Price
                  </label>
                  <input
                    value={productData.offerPrice}
                    onChange={handleChange}
                    id="offerPrice"
                    type="number"
                    placeholder="0"
                    className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                  />
                </div>
              )}
            </div>
            <button
              type="submit"
              className="px-8 py-2.5 bg-indigo-500 text-white font-medium rounded"
            >
              {isPending ? "Update...." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateProject;
