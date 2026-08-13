"use server";

import {connectMongoDB} from "@/app/api/db/connectMongoDB";
import Product from "@/app/api/models/product.model";
import cloudinary from "@/app/utils/cloudinary";

export async function updateProduct(formData: FormData, id: string) {
    try {
        const image = formData.get("image") as File;
        const name = formData.get("name");
        const price = formData.get("price");
        const link = formData.get("link");
        const description = formData.get("description");

        if (!name || !price || !link || !description) {
            return {
                error: "Only Image change is optional."
            };
        }

        await connectMongoDB();

        const product = await Product.findById(id);
        if (!product) {
            return {
                error: "Product not found"
            };
        }

        if (image.size === 0){
            // Update without image
            await Product.findByIdAndUpdate(id, {
                name,
                price,
                link,
                description,
            });
        }
        else {
            // Delete previous image
            const parts = product.image.split("/");
            const fileName = parts[parts.length - 1];
            const imageId = fileName.split(".")[0];
            cloudinary.uploader.destroy(`LioVintageCarShop/${imageId}`)
                .then((result) => console.log("Result: ", result));

            // Process new image
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
            console.log("ImageResponse: ", imageResponse);

            //Store in db
            await Product.findByIdAndUpdate(id, {
                image: imageResponse.secure_url,
                name,
                price,
                link,
                description,
            });
        }

        return {
            success: "Product updated successfully.",
        };
    }
    catch (error) {
        return {
            error: "Something went wrong",
        }
    }
}