import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { withoutAuthAxios } from "../config/config";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  StarIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import Pagination from "../Common/Pagination";
import Footer from "./Footer";

const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  {
    name: "Price: Low to High",
    sort: "discountPrice",
    order: "asc",
    current: false,
  },
  {
    name: "Price: High to Low",
    sort: "discountPrice",
    order: "desc",
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductsListSideBar() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [products, setproducts] = useState([]);
  const [productCategory, setproductCategory] = useState([]);
  const [brandCategory, setbrandCategory] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [limitPage, setlimitPage] = useState(5);
  const [totalItems, settotalItems] = useState(0);
  const [totalPage, settotalPage] = useState(10);
  const [currentCategory, setCurrentCategory] = useState("");

  const [currentProduct, setcurrentProduct] = useState("");

  const [SaveCategory, setSaveCategory] = useState({
    id: "",
    value: "",
  });

  const fecthallproducts = async () => {
    await withoutAuthAxios()
      .get(`/products`)
      .then((response) => {
        const resData = response.data;

        setproducts(resData?.products);
      })
      .catch((error) => {});
  };

  const fetchCategory = async () => {
    withoutAuthAxios()
      .get("/products/categories")
      .then((response) => {
        setproductCategory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fecthallproducts();
    fetchCategory();
    //   fetchBrandCategory();
  }, []);

  const filters = [
    
    {
      id: "category",
      name: "Category",
      options: [...productCategory],
    },
  ];

  const handleFilter = (e, section, option) => {
    console.log(option)
    if (e.target.checked) {
      // If a new category is checked, update the currentCategory state
      setCurrentCategory(option);
      // Fetch products based on the selected category
      productCatgories(option);
    } else {
      // If the category is unchecked, reset the currentCategory state and fetch all products
      setCurrentCategory("");
      fecthallproducts();
    }
  };

  const productCatgories = async (data) => {
    await withoutAuthAxios()
      .get(`/products/category/${data}`)
      .then((response) => {
        setproducts(response.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSort = (option) => {
    const handlesortVal = option.order;

    if (!SaveCategory.id == "" || SaveCategory.value == "") {
      withoutAuthAxios()
        .get(
          `/products?${SaveCategory.id}=${SaveCategory.value}&_sort=price&_order=${handlesortVal}`
        )
        .then((response) => {
          setproducts(response.data);
          ///console.log(response)
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      withoutAuthAxios()
        ///products?_sort=price&_order=desc
        .get(`/products?_sort=price&_order=${handlesortVal}`)
        .then((response) => {
          setproducts(response.data);
          ///console.log(response)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <ul
                      role="list"
                      className="px-2 py-3 font-medium text-gray-900"
                    ></ul>

                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-[16px] text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      type="checkbox"
                                      checked={currentCategory === option}
                                      onChange={(e) =>
                                        handleFilter(e, section, option)
                                      }
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                   
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1
              onClick={() => alert("fd")}
              className="text-2xl font-medium tracking-tight text-gray-900 uppercase lg:text-4xl	"
            >
              All Products
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-[16px] font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <p
                              onClick={(e) => handleSort(option)}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </p>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only ">Categories</h3>
                <ul
                  role="list"
                  className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                ></ul>

                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      type="checkbox"
                                      checked={currentCategory === option}
                                      onChange={(e) =>
                                        handleFilter(e, section, option)
                                      }
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              <div className="lg:col-span-3">
                {" "}
                <div className="bg-white">
                  <div className="productlist md:pl-[0] mx-auto max-w-2xl px-0 py-16 sm:pl-6 sm:py-0 lg:max-w-7xl lg:pl-8">
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                      {products &&
                        products.length > 0 &&
                        products.map((item) => (
                          <Link className='product-item' to={`/product-detail/${item.id}`}>
                            <div key={item.id} className="group relative">
                              <div className="productimage aspect-[1] w-full overflow-hidden rounded-md bg-gray-200  group-hover:opacity-75 lg:aspect-[1/1.4]">
                                <img
                                  src={item.images[1] || item.images[2]}
                                  //alt={item.imageAlt}
                                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                              </div>

                              <div className="mt-[10px] flex justify-between">
                                <div className="tittle max-w-[87%]">
                                  <h3 className="text-[15px] font-medium text-[#111]">
                                    <a>
                                      <span
                                        aria-hidden="true"
                                        className="absolute inset-0"
                                      />
                                      {item.title}
                                    </a>
                                  </h3>
                                  {/*
                                  <p className="mt-1 text-sm text-gray-500">
                                    {item.description.substring(0, 20)}..
                                  </p>
                                  <p className="mt-1 text-sm text-gray-500">
                                    {item.rating}
                                    <StarIcon
                                      height={20}
                                      width={20}
                                      color="#faaf00"
                                    />
                                  </p>
                        */}
                                </div>
                                <p className="text-sm font-medium text-gray-900">
                                  $ {item.price}
                                </p>
                              </div>

                              <div className="mt-[10px] flex  gap-[5px] hidden	">
                                <div>
                                  <h3 className="text-sm text-gray-700">
                                    <a>
                                      <span
                                        aria-hidden="true"
                                        className=" inset-0"
                                      />
                                      {item.description.substring(0, 20)}..
                                    </a>
                                  </h3>
                                </div>

                                <p className="text-sm ml-auto font-medium text-gray-900">
                                  {item.rating}
                                </p>
                                <StarIcon
                                  height={20}
                                  width={20}
                                  color="#faaf00"
                                />
                              </div>
                            </div>
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*  <Pagination  currentPage={currentPage} setcurrentPage={setcurrentPage} limitPage={limitPage} totalPage={totalPage} totalItems={totalItems} />
             */}
          </section>
        </main>
      </div>
    </div>
     <Footer/>
     </>
  );
}
