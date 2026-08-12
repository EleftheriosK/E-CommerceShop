"use server";
import cloudinary from "@/app/utils/cloudinary";
import {connectMongoDB} from "@/app/api/db/connectMongoDB";
import Product from "@/app/models/product.model";

export async function addProduct(formData: FormData)
{
    try {
        const image = formData.get("image") as File;
        const name = formData.get("name");
        const price = formData.get("price");
        const link = formData.get("link");
        const description = formData.get("description");

        if (!image || !name || !price || !link || !description) {
            console.log("All fields are required.");
            return {
                error: "All fields are required.",
            };
        }

        // Image processes
        const arrayBuffer = await image.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);
        const imageResponse: any = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    resource_type: "auto",
                    folder: "LioVintageCarShop",
                },
                async (err: any, result: any) => {
                    if (err) {
                        return reject(err.message);
                    }
                    return resolve(result);
                }
            ).end(buffer);
        })

        console.log("Image response: ", imageResponse);

        await connectMongoDB();

        await Product.create({
            image: imageResponse.secure_url,
            name: name,
            price: price,
            link: link,
            description: description,
        });

        return {
            success: "IProduct added successfully.",
        };
    }catch (error){
        return {
            error: "Something went wrong"
        };
    }
}