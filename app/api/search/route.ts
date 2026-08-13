import {NextRequest} from "next/server";
import Product from "@/app/api/models/product.model";

export async function GET(req: NextRequest) {
    try{
        const searchParams = req.nextUrl.searchParams;
        const searchTerm = searchParams.get("searchTerm");

        const products = await Product.find({
            name: {$regex: searchTerm, $options: "i"},
        }).sort({createdAt: -1});

        return Response.json({products}, {status: 200});
    }
    catch(err: any){
        console.log("Error in searching product", err);
        return Response.json({message: err.message}, {status: 400});
    }
}