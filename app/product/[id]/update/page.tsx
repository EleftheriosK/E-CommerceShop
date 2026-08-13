"use client";

import React from "react";
import {useParams} from "next/navigation";
import UpdateForm from "@/components/UpdateForm";

const UpdateProduct = () => {
    const params = useParams();

    return (
        <div className="px-4 md:px-12 bg-[#F8F9FA] pb-8">
            <h2 className="text-center text-black font-semibold pt-8 text-xl
            md:text-2xl w-full max-w-xl mx-auto">
                Update product
            </h2>
            <UpdateForm id={params.id as string} />
        </div>
    );
};

export default UpdateProduct;