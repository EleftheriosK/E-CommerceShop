"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import {useSearchParams} from "next/navigation"
import {useEffect, useState, Suspense} from "react";
import IProduct from "@/app/Interfaces/IProduct";

const SearchResults = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const searchParams = useSearchParams();

    useEffect(() => {
        const searchTermFromUrl = searchParams.get("searchTerm");
        if (searchTermFromUrl) {
            axios.get(`/api/search?searchTerm=${searchTermFromUrl}`)
                .then((response) => setProducts(response.data.products))
                .catch((error) => console.error("Error fetching products: ", error));
        }
    }, [searchParams]);

    return(
        <div
            className="px-4 md:px-12 py-5 md:py-10 flex justify-center items-center"
            id="product"
            >
            {products.length > 0 ? (
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                    >
                    {products.map((product) => (
                        <Link href={`/product/${product._id}`} key={product._id}>
                        <Image
                            src={product.image}
                            alt="img"
                            width="1000"
                            height="1000"
                            className="max-w-68 min-h-72 max-h-2 object-cover object-center rounded-lg"
                            />
                            <div className="mt-4">
                                <h2 className="font-semibold text-lg">
                                    {product.name}
                                </h2>
                                <p className="font-medium text-sm mt-1">
                                    {product.price} Euros
                                </p>
                            </div>
                            </Link>
                            )
                        )
                    }
                </div>
            ) : (
                <div className="flex flex-col items-center gap-3">
                    <p>No products found.</p>
                    <Link
                        href="/"
                        className="bg-[#212529] hover:bg-[#343A40] text-white px-3 py-2 rounded-md"
                    >
                        Return to homepage
                    </Link>
                </div>
                )
            }
        </div>
    );
};

const SearchPage = () => {
    return (
        <Suspense fallback={<div>Loading search results...</div>}>
            <SearchResults />
        </Suspense>
    );
};

export default SearchPage;