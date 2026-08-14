import {connectMongoDB} from "@/app/api/db/connectMongoDB";
import Product from "@/app/api/models/product.model";
import cloudinary from "@/app/utils/cloudinary";

export async function GET(req: Request,
                          {params} : { params: Promise<{ productId: string }> })
{
    await connectMongoDB();
    const productId = (await params).productId;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return Response.json({message: "Product not found"}, {status: 404});
        }
        return Response.json({product}, {status: 200});
    }
    catch (err: any){
        console.log("Error in getting product", err);
        Response.json({message: err.message}, {status: 404});
    }
}

export async function DELETE (req: Request,
                              {params} : { params: Promise<{ productId: string }> })
{
    await connectMongoDB();
    const productId = (await params).productId;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return Response.json({message: "Product not found"}, {status: 404});
        }

        // Delete Image
        const parts = product.image.split("/");
        const fileName = parts[parts.length - 1];
        const imageId = fileName.split(".")[0];
        cloudinary.uploader.destroy(`LioVintageCarShop/${imageId}`)
            .then((result) => console.log("Result: ", result));

        // Delete database entry
        await Product.findByIdAndDelete(productId);

        return Response.json({message: "Product deleted successfully"}, {status: 200});
    }
    catch (err: any){
        console.log("Error in deleting product", err);
        Response.json({message: err.message}, {status: 400});
    }
}