import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { withoutAuthAxios } from "../config/config";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem, addWishlistItem } from "../Redux/Reducers/cartSlice";
import { toast } from "react-toastify";
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function ProductDetail() {
  const parmas = useParams();
  const dispatch = useDispatch();
  const id = parmas.id;

  const [productDetail, setproductDetail] = useState(null);
  const [currentImage, setcurrentImage] = useState('')
  const fetchProduct = async () => {
    await withoutAuthAxios()
      .get(`/products/${id}`)
      .then((response) => {
        const resData = response.data;

        console.log(resData) 

        setproductDetail(resData); 
        setcurrentImage(resData.images[4])
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  const AllWishlistProducts = useSelector((state) => state?.cart?.wishlist);
  const handleCart = () => {
    toast.success("Product added to cart successfully.");
    dispatch(addCartItem(productDetail));
  };

  const handleWishlist = () => {
    const isProductInWishlist = AllWishlistProducts.some(
      (item) => item.id === productDetail.id
    );

    if (isProductInWishlist) {
      toast.info("Product is already in Wishlist");
    } else {
      toast.success("Product added to wishlist successfully.");
      dispatch(addWishlistItem(productDetail));
    }
  };

  return (
    <>
      {productDetail && (
        <div className="font-[sans-serif] bg-[#fff]">
          <div className="p-6 lg:max-w-7xl max-w-2xl m-auto	 max-lg:m-auto  py-[50px]">
            <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12">
              <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
                <div className=" px-4 py-10 rounded-xl">
                  <img
                    src={currentImage}
                    alt="Product"
                    className="w-4/5 rounded object-cover"
                  />
                </div>
                <div className=" flex flex-wrap justify-center gap-x-10 gap-y-6 mx-auto">
                  {/* <div className="bg-gray-800 rounded-xl p-4">
               <img src="https://readymadeui.com/images/coffee5.webp" alt="Product2" className="w-24 cursor-pointer" />
             </div>
             */}

                  {productDetail &&
                    productDetail.images.slice(0, 3).map((imageUrl, index) => (
                      <div key={index} classNameName="bg-gray-800 rounded-xl p-4">
                        <img
                          onClick={()=>setcurrentImage(imageUrl)}
                          src={imageUrl}
                          alt="Product2"
                          className="w-24 h-24 cursor-pointer"
                        />
                      </div>
                    ))}
                </div>
              </div>
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-extrabold text-[#111]">
                  {productDetail.title}
                </h2>
                <div className="flex flex-wrap gap-4 mt-4">
                  <p className="text-[#111] text-[22px] font-bold">
                    ${productDetail.price}
                  </p>
                  <p className="text-gray-400 text-xl">
                    <strike>${productDetail?.price + 100}</strike>{" "}
                    <span className="text-sm ml-1">Tax included</span>
                  </p>
                </div>
                <div className="flex space-x-2 mt-4">
                  <svg
                    className="w-5 fill-yellow-300"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <svg
                    className="w-5 fill-yellow-300"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <svg
                    className="w-5 fill-yellow-300"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <svg
                    className="w-5 fill-yellow-300"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <svg
                    className="w-5 fill-[#CED5D8]"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <h4 className="text-white text-base">
                    {Math.round(productDetail?.rating * 100)} Reviews
                  </h4>
                </div>
                <div className="flex flex-wrap gap-4 mt-8">
                  <button
                    onClick={() => handleWishlist()}
                    type="button"
                    className="min-w-[200px] px-4 py-3 bg-[#111] hover:bg-yellow-400 text-white text-sm font-bold rounded"
                  >
                   
                    Add to Wishlist
                  </button>
                  <button
                    type="button"
                    className="min-w-[200px] px-4 py-2.5 border border-[#111] bg-transparent text-[#111] text-sm font-bold rounded"
                    onClick={() => handleCart()}
                  >
                    
                    Add to cart
                  </button>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-bold text-[#111]">
                    About the Product
                  </h3>
                  <ul className="space-y-3 list-disc mt-4 pl-4 text-sm text-[#111]">
                    <li>{productDetail?.description}</li>
                    <li>Brand {productDetail.brand}</li>
                    <li>Category {productDetail.category}</li>
                  </ul>
                </div>
                <div className="mt-8">
                  <ul className="flex">
                    <li className="text-white font-bold text-sm bg-[#111] py-3 px-8  cursor-pointer transition-all">
                      Reviews
                    </li>
                  </ul>
                  <div className="mt-8">
                    <h3 className="text-lg font-bold text-[#111]">
                      Reviews({Math.round(productDetail?.rating * 100)})
                    </h3>
                    <div className="space-y-3 mt-4">
                      <div className="flex items-center">
                        <p className="text-sm text-white font-bold">5.0</p>
                        <svg
                          className="w-5 fill-yellow-300 ml-1"
                          viewBox="0 0 14 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                        <div className="bg-[#ced5d8] rounded w-full h-2 ml-3">
                          <div className="w-2/3 h-full rounded bg-yellow-300"></div>
                        </div>
                        <p className="text-sm text-white font-bold ml-3">66%</p>
                      </div>
                      <div className="flex items-center">
                        <p className="text-sm text-white font-bold">4.0</p>
                        <svg
                          className="w-5 fill-yellow-300 ml-1"
                          viewBox="0 0 14 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                        <div className="bg-[#ced5d8] rounded w-full h-2 ml-3">
                          <div className="w-1/3 h-full rounded bg-yellow-300"></div>
                        </div>
                        <p className="text-sm text-white font-bold ml-3">33%</p>
                      </div>
                      <div className="flex items-center">
                        <p className="text-sm text-white font-bold">3.0</p>
                        <svg
                          className="w-5 fill-yellow-300 ml-1"
                          viewBox="0 0 14 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                        <div className="bg-[#ced5d8] rounded w-full h-2 ml-3">
                          <div className="w-1/6 h-full rounded bg-yellow-300"></div>
                        </div>
                        <p className="text-sm text-white font-bold ml-3">16%</p>
                      </div>
                      <div className="flex items-center">
                        <p className="text-sm text-white font-bold">2.0</p>
                        <svg
                          className="w-5 fill-yellow-300 ml-1"
                          viewBox="0 0 14 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                        <div className="bg-[#ced5d8] rounded w-full h-2 ml-3">
                          <div className="w-1/12 h-full rounded bg-yellow-300"></div>
                        </div>
                        <p className="text-sm text-white font-bold ml-3">8%</p>
                      </div>
                      <div className="flex items-center">
                        <p className="text-sm text-white font-bold">1.0</p>
                        <svg
                          className="w-5 fill-yellow-300 ml-1"
                          viewBox="0 0 14 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                        <div className="bg-[#ced5d8] rounded w-full h-2 ml-3">
                          <div className="w-[6%] h-full rounded bg-yellow-300"></div>
                        </div>
                        <p className="text-sm text-white font-bold ml-3">6%</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start mt-8">
                    <img
                      src="https://readymadeui.com/team-2.webp"
                      className="w-12 h-12 rounded-full border-2 border-white"
                    />
                    <div className="ml-3">
                      <h4 className="text-sm font-bold text-[#111]">John Doe</h4>
                      <div className="flex space-x-1 mt-1">
                        <svg
                          className="w-4 fill-yellow-300"
                          viewBox="0 0 14 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                        <svg
                          className="w-4 fill-yellow-300"
                          viewBox="0 0 14 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                        <svg
                          className="w-4 fill-yellow-300"
                          viewBox="0 0 14 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                        <svg
                          className="w-4 fill-[#CED5D8]"
                          viewBox="0 0 14 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                        <svg
                          className="w-4 fill-[#CED5D8]"
                          viewBox="0 0 14 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                        <p className="text-xs !ml-2 font-semibold text-white">
                          2 mins ago
                        </p>
                      </div>
                      <p className="text-xs mt-4 text-white">
                        The service was amazing. I never had to wait that long
                        for my food. The staff was friendly and attentive, and
                        the delivery was impressively prompt.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="w-full mt-8 px-4 py-2 bg-transparent border-2 border-[#111] text-[#111] font-bold rounded"
                  >
                    Read all reviews
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
