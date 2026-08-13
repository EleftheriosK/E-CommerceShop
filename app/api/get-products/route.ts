import {connectMongoDB} from "@/app/api/db/connectMongoDB";
import Product from "@/app/api/models/product.model";

export async function GET(req: Request) {
    await connectMongoDB();
    try{
        const products = await Product.find().sort({ createdAt: -1});
        return Response.json({products}, {status: 200});
    }
    catch(err: any){
        console.log("Error in getting product data", err);
        return Response.json({message: err.message}, {status: 400});
    }
}