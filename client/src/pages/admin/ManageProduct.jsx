import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import toast from 'react-hot-toast';


const getProduct = async () =>{
  const res = await axios.get('http://localhost:5000/api/product/get');
  return res.data;
}

const deleteProduct = async (id) => {
  const res = await axios.delete(`http://localhost:5000/api/product/delete/${id}`);
  return res.data;
}

const ManageProduct = () => {

  const queryClient = useQueryClient();


  const { data } = useQuery({
    queryKey : ['products'],
    queryFn : getProduct
  });

  const { mutate, isPending } = useMutation({
    mutationFn : deleteProduct,
    onSuccess: (data) => {
    queryClient.invalidateQueries(["products"]);
    toast.success(data.message);
    },
  });

  return (
    <div className="flex-1 py-10 flex flex-col justify-between">
      <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-lg font-medium">All Products</h2>
        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">Product</th>
                <th className="px-4 py-3 font-semibold truncate">Category</th>
                <th className="px-4 py-3 font-semibold truncate hidden md:block">
                  Selling Price
                </th>
                <th className="px-4 py-3 font-semibold truncate">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {data.products.map((product, index) => (
                <tr key={index} className="border-t border-gray-500/20">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    <div className="border border-gray-300 rounded overflow-hidden">
                      <img src={product.images[0]} alt="Product" className="w-16" />
                    </div>
                    <span className="truncate max-sm:hidden w-full">
                      {product.name}
                    </span>
                  </td>
                  <td className="px-4 py-3">{product.category}</td>
                  <td className="px-4 py-3 max-sm:hidden">
                    PKR{product.offerPrice ? product.offerPrice : product.price}
                  </td>
                  <td className="px-4 py-3">
                    <div className='flex gap-2 text-xl'>
                      <button disabled={isPending} onClick={() =>mutate(product._id)} className='cursor-pointer text-red-500'><MdDelete /></button>
                      <button className='cursor-pointer text-green-500'><FaRegEdit /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageProduct;
