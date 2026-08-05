import AddForm from "@/components/AddForm";
const AddProduct = () =>
{
    return(
        <div className="px-4 md:px-12 bg-[#F8F9FA] pb-8">
            <h2 className="text-center font-semibold pt-8 text-xl md:text-2xl
            w-full max-w-xl mx-auto text-black">Add a new product
            </h2>
            <AddForm />
        </div>
    )
}

export default AddProduct;