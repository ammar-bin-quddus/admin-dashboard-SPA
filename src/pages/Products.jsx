import useProducts from "../hooks/UseProducts";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Products = () => {
  const { products, error, refetch } = useProducts();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
    const {name, ...remainData} = data;
    const productData = {name, data: {...remainData}};
    try {
      const res = await axios.post(
        'https://api.restful-api.dev/objects',
        productData,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      console.log(res?.data);
      if (res.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Product Added Successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
        reset();
        refetch();
      }
    } catch (error) {
      toast.error(error.message);
    }


  };

  const handleDeleteProduct = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(
            `https://api.restful-api.dev/objects/${id}`
          );
          console.log(res?.data);
          if (res?.data?.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your Campaign Data has been deleted.",
              icon: "success",
            });
            refetch();
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    });
  };

  if (error)
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="text-2xl text-center font-bold">{error.message}</p>
      </div>
    );

  return (
    <div>
      <div className="mt-5 border-b-2 pb-2 mx-10">
        <h1 className="text-center text-xl md:text-2xl font-bold">
          Total Products: {products?.length}
        </h1>
      </div>
      <div className="overflow-x-auto overflow-y-scroll h-[400px] mx-10 my-3">
        <table className="w-full border-collapse border border-gray-300">
          {/* table head */}
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-3 border border-gray-300">SN</th>
              <th className="p-3 border border-gray-300">Name</th>
              <th className="p-3 border border-gray-300"></th>
            </tr>
          </thead>
          {/* table body */}
          <tbody>
            {products?.map((product, idx) => {
              return (
                <tr
                  key={idx}
                  className="odd:bg-gray-300 even:bg-gray-100 text-gray-900 font-bold"
                >
                  <td className="p-3 border border-gray-300">{idx + 1}</td>
                  <td className="p-2 border border-gray-300">
                    {product?.name}
                  </td>
                  <td className="p-2 border border-gray-300">
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="px-3 py-1 text-sm font-medium bg-gray-800 text-white rounded-md hover:bg-gray-900 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-5 border-b-2 pb-2 mx-10">
        <h1 className="text-center text-xl md:text-2xl font-bold">
          Add Products
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 my-6 mx-10">
        {/* Email */}
        <div className="flex flex-col space-y-1">
          <label className="text-gray-700 font-medium">Product Name</label>
          <input
            {...register("name", { required: true })}
            type="text"
            placeholder="Enter your product name"
            className="w-full border-gray-300 focus:ring-2 focus:ring-gray-800 rounded-lg px-3 py-2 text-gray-800 outline-none"
            required
          />
          {errors.name && (
            <p className="text-red-500 text-sm">Name is required</p>
          )}
        </div>

        {/* color */}

        <div className="flex flex-col space-y-1">
          <label className="text-gray-700 font-medium">Product Color</label>
          <input
            {...register("color", { required: true })}
            type="text"
            placeholder="Enter your product color"
            className="w-full border-gray-300 focus:ring-2 focus:ring-gray-800 rounded-lg px-3 py-2 text-gray-800 outline-none"
            required
          />
          {errors.color && (
            <p className="text-red-500 text-sm">Color is required</p>
          )}
        </div>

        {/* price */}

        <div className="flex flex-col space-y-1">
          <label className="text-gray-700 font-medium">Product Price</label>
          <input
            {...register("price", { required: true })}
            type="text"
            placeholder="Enter your product price"
            className="w-full border-gray-300 focus:ring-2 focus:ring-gray-800 rounded-lg px-3 py-2 text-gray-800 outline-none"
            required
          />
          {errors.price && (
            <p className="text-red-500 text-sm">Price is required</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gray-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default Products;
