"use server";

export async function addProduct(formData: FormData)
{
    const image = formData.get("image") as File;
    const name = formData.get("name");
    const price = formData.get("price");
    const link = formData.get("link");
    const description = formData.get("description");

    console.log(name, price, link, description);
}