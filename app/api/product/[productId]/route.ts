import {connectMongoDB} from "@/app/api/db/connectMongoDB";
import Product from "@/app/api/models/product.model";

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