"use client"
import {addProduct} from "@/app/utils/addProduct";

const AddForm = () =>
{
    async function clientAddProduct(formData: FormData)
    {
        await addProduct(formData);
    }
    return (
        <form
            action={clientAddProduct}
            className="w-full max-w-xl mx-auto flex flex-col justify-center items-center space-y-4 mt-3 md:mt-5">
            <div className="flex flex-col w-full text-black">
                <label className="">Product Image:</label>
                <input
                    type="file"
                    accept="image/*"
                    name="image"
                    className="w-full px-3 py-1.5 md:py-2 text-[#252422]
                    rounded-lg bg-white border border-gray-500"/>
            </div>
            <div className="flex flex-col w-full text-black">
                <label className="">Name:</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Please enter the product name"
                    className="w-full px-3 py-1.5 md:py-2 text-[#252422]
                    rounded-lg bg-white border border-gray-500"/>
            </div>
            <div className="flex flex-col w-full text-black">
                <label className="">Price:</label>
                <input
                    type="text"
                    name="price"
                    placeholder="Please enter the product price"
                    className="w-full px-3 py-1.5 md:py-2 text-[#252422]
                    rounded-lg bg-white border border-gray-500"/>
            </div>
            <div className="flex flex-col w-full text-black">
                <label className="">Seller's Link:</label>
                <input
                    type="text"
                    name="link"
                    placeholder="Please enter the link to where buyers can find you"
                    className="w-full px-3 py-1.5 md:py-2 text-[#252422]
                    rounded-lg bg-white border border-gray-500"/>
            </div>
            <div className="flex flex-col w-full text-black">
                <label className="">Description:</label>
                <textarea
                    rows={4}
                    name="description"
                    placeholder="Please enter the product description"
                    className="w-full px-3 py-1.5 md:py-2 text-[#252422]
                    rounded-lg bg-white border border-gray-500"/>
            </div>
            <button
                type="submit"
                className="w-full bg-[#212529] hover:bg-[#343A40] text-white px-3 py-2 rounded-md">
                Submit
            </button>
        </form>
    )
}

export default AddForm;