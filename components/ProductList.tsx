"use client";

import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";
import axios from "axios";
import IProduct from "@/app/interfaces/IProduct";

const ProductList = () =>
{
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get("/api/get-products/")
            .then((response) => setProducts(response.data.products));
    }, []);

    return(
        <div className="px-4 md:px12 py-5 md:py-10 flex justify-center items-center"
        id = "product">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {
                    products.map((product: IProduct, index) =>
                        (
                            <Link href={`/product/${product._id}`} key={index}>
                                <Image
                                    src={product.image}
                                    alt="img"
                                    width={1000}
                                    height={1000}
                                    className="max-w-68 h-72 object-cover object-center rounded-lg"/>
                                <div className="mt-4">
                                    <h2 className="font-semibold text-lg text-black">
                                        {product.name}
                                    </h2>
                                    <p className="font-medium text-sm mt-1 text-black">
                                        {product.price} Euros
                                    </p>
                                </div>
                            </Link>
                        )
                    )
                }
            </div>
        </div>
    )
}

export default ProductList;