"use client";

import ProductList from "@/components/ProductList";
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, {useEffect, useState} from "react";
import IProduct from "@/app/interfaces/IProduct";
import Link from "next/link";

const ProductPage = () => {
    const router = useRouter();
    const [open, setOpen] = React.useState(false);
    const params = useParams();
    const [product, setProduct] = useState<IProduct>();

    useEffect(() => {
        axios.get(`/api/product/${params.id}`)
            .then((response) => setProduct(response.data.product));
    }, [params.id]);

    if (!product) {
        return <p>Loading...</p>;
    }

    return (
        <div className="px-4 md:px-12 bg-[#F8F9FA]">
            <p className="cursor-pointer py-3 text-black"
               onClick={() => {router.back()}}>
                &larr; Back
            </p>
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row
            justify-between items-center md:spece-x-10">
                <Image
                    src={product.image}
                    alt="img"
                    width={1000}
                    height={1000}
                    className="max-w-full md:max-w-xl md:min-w-120 min-h-112 max-h-112
                    object-cover object-center basis-1/2"
                    />
                <div className="basis-1/2 py-8">
                    <div className="flex justify-between items-center">
                        <h2 className="px-5 text-2xl text-black">
                            {product.name}
                        </h2>
                        <div className="text-2xl font-bold text-black -mt-2 relative">
                            <span
                                onClick={() => setOpen(!open)}
                                className="cursor-pointer tracking-widest"
                                >
                                ...
                                {
                                    open && (
                                        <div className="absolute bg-white shadow-md
                                        pb-2 px-5 text-base font-normal right-0 top-10"
                                             >
                                            <Link href={`/product/${product._id}/update`}>
                                                <p className="mb-2 pb-2 border-b border-gray-300">
                                                    Update
                                                </p>
                                            </Link>
                                            <p className="text-red-500 cursor-pointer">
                                                Delete
                                            </p>
                                        </div>
                                    )
                                }
                            </span>
                        </div>
                    </div>
                    <h3 className="px-5 text-2xl font-semibold text-black mt-3">
                        {product.price} Euros
                    </h3>
                    <Link href={product.link} target="_blank">
                        <button className="mt-8 bg-green-900 hover:bg-green-600
                        text-white px-10 py-2 cursor-pointer w-fit font-semibold
                        border-4">
                            Contact Seller
                        </button>
                    </Link>
                    <p className="px-5 font-semibold mt-10 text-lg text-black">
                        Description
                    </p>
                    <p className="px-5 font-medium mt-1 text-black">
                        {product.description}
                    </p>
                    <h2 className="w-full text-2xl font-semibold text-black pt-20">
                        You might also like
                    </h2>
                    <ProductList />
                </div>
            </div>
        </div>
    )
}

export default ProductPage;