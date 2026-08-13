"use client";

import {updateProduct} from "@/app/utils/updateProduct";
import axios from "axios";
import {StaticImport} from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import {useRouter} from "next/navigation";
import React, {ChangeEvent, useEffect, useState} from "react";
import IProduct from "@/app/interfaces/IProduct";

const updateForm = ({id} : {id:string}) => {
    const [imageUrl, setImageUrl] = useState<string | StaticImport>("");
    const router = useRouter();
    const [product, setProduct] = useState<IProduct>();

    useEffect(() => {
        axios.get(`/api/product/${id}`)
            .then((response) => setProduct(response.data.product))
    }, []);

    useEffect(() => {
        if(product) {
            setImageUrl(product.image)
        }
    }, [product]);

    async function clientUpdateProduct(formData: FormData) {
        const result = await updateProduct(formData, id);
        if(result.error) {
            alert(result.error);
        }
        if(result.success) {
            alert(result.success);
            router.push("/");
        }

        setImageUrl("");
    }

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const fileSize = file.size;
            if(Math.round(fileSize / 1024) > 1024){
                alert("Image greater than 1mb is not allowed.");
            }
            else {
                setImageUrl(URL.createObjectURL(file));
            }
        }
    }

    if (!product) {
        return <p>Loading...</p>
    }

    return(
        <form
            action={clientUpdateProduct}
            className="w-full max-w-xl mx-auto flex flex-col items-center justify-center
            space-y-4 mt-3 md:mt-5"
            >
            {imageUrl ? (
                <Image
                    src={imageUrl}
                    alt="img"
                    width={1000}
                    height={1000}
                    className="max-w-full max-h-72 object-cover object-center rounded-lg"
                    />
            ) : null}
            <div className="flex flex-col w-full text-black">
                <label className="">Product Image:</label>
                <input
                    type="file"
                    accept="image/*"
                    name="image"
                    onChange={handleImageChange}
                    className="w-full px-3 py-1.5 md:py-2 text-[#252422]
                        rounded-lg bg-white border border-gray-500
                        file:border file:border-gray-500 file:rounded-md
                        file:px-3 file:py-1 file:mr-3
                        file:bg-gray-100 file:text-[#252422]
                        file:cursor-pointer hover:file:bg-gray-200"
                    />
            </div>
            <div className="flex flex-col w-full text-black">
                <label className="">Name:</label>
                <input
                    type="text"
                    name="name"
                    defaultValue={product?.name}
                    placeholder="Please enter the product name"
                    className="w-full px-3 py-1.5 md:py-2 text-[#252422]
                    rounded-lg bg-white border border-gray-500"/>
            </div>
            <div className="flex flex-col w-full text-black">
                <label className="">Price:</label>
                <input
                    type="text"
                    name="price"
                    defaultValue={product?.price}
                    placeholder="Please enter the product price"
                    className="w-full px-3 py-1.5 md:py-2 text-[#252422]
                    rounded-lg bg-white border border-gray-500"/>
            </div>
            <div className="flex flex-col w-full text-black">
                <label className="">Seller's Link:</label>
                <input
                    type="text"
                    name="link"
                    defaultValue={product?.link}
                    placeholder="Please enter the link to where buyers can find you"
                    className="w-full px-3 py-1.5 md:py-2 text-[#252422]
                    rounded-lg bg-white border border-gray-500"/>
            </div>
            <div className="flex flex-col w-full text-black">
                <label className="">Description:</label>
                <textarea
                    rows={4}
                    name="description"
                    defaultValue={product?.description}
                    placeholder="Please enter the product description"
                    className="w-full px-3 py-1.5 md:py-2 text-[#252422]
                    rounded-lg bg-white border border-gray-500"/>
            </div>
            <button
                type="submit"
                className="w-full bg-[#212529] hover:bg-[#343A40] text-white px-3 py-2 rounded-md">
                UpdateProduct
            </button>
        </form>
    );
};

export default updateForm;
