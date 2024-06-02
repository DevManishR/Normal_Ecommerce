import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCartItem,
  deleteWishlistItem,
  removeWishlistItem,
} from "../Redux/Reducers/cartSlice";
import { ShoppingCartIcon, StarIcon } from "@heroicons/react/24/outline";
import { ShoppingBagIcon } from "@heroicons/react/20/solid";
import { toast } from "react-toastify";
const Wishlist = () => {
  const AllWishlistProducts = useSelector((state) => state?.cart?.wishlist);

  const dispatch = useDispatch();

  const handlecart = (item) => {
    dispatch(addCartItem(item));
    dispatch(deleteWishlistItem(item));
    toast.success("Product added to cart successfully");
  };

  return (
    <>
      {AllWishlistProducts && AllWishlistProducts.length > 0 ? (
        <div class="flex items-start bg-white min-h-screen ">
          <div class="container ml-auto mr-auto flex flex-wrap items-start">
            <div class="w-full pl-5 lg:pl-2 mb-4 mt-4">
              <h1 class="text-3xl mb-25 font-serif mt-12 lg:text-4xl text-[#111]  uppercase font-medium">
                Wishlist Items
              </h1>
            </div>

            {AllWishlistProducts &&
              AllWishlistProducts.map((item) => (
                <div class="w-full md:w-1/2 lg:w-1/4 pl-5 pr-5 mb-5 lg:pl-2 lg:pr-2">
                  <div class="rounded-lg m-h-64 p-2 transform hover:translate-y-2 hover:shadow-xl transition duration-300">
                    <figure class="mb-2">
                      <img
                        src={item.images[0] || item.images[1]}
                        alt=""
                        class="h-64 ml-auto mr-auto"
                      />
                    </figure>
                    <div class="rounded-lg p-4 bg-[#111] flex flex-col">
                      <div>
                        <h5 class="text-white text-2xl font-bold leading-none">
                          {item?.title}
                        </h5>
                        <span class="text-xs text-gray-400 leading-none">
                          {item.description.substring(0, 20)}
                        </span>
                      </div>
                      <div class="flex items-center">
                        <div class="text-lg text-white font-light">
                          ${item.price}
                        </div>
                        <div class="text-lg text-white font-light  ml-10">
                          {item.rating}{" "}
                        </div>

                        <div class="text-lg text-white font-light  ml-1">
                          <StarIcon height={20} width={20} color="#faaf00" />
                        </div>

                        <button
                          href="javascript:;"
                          class="rounded-full bg-gray-800 text-white hover:bg-white hover:text-purple-900 hover:shadow-xl focus:outline-none w-10 h-10 flex ml-auto transition duration-300"
                          onClick={() => handlecart(item)}
                        >
                          <ShoppingCartIcon
                            width="24"
                            height="24"
                            className="ml-2 mt-2"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        
        <h1 className="font-serif  text-black text-center text-3xl mt-10">
          No Products In Wishlist
        </h1>
        
      )}
    </>
  );
};

export default Wishlist;
