export interface Product {
    name: string;
    price: number;
    image: string;
    alt?: string;
}

export type ProductDictionary = Record<string, Product>;

export const products: ProductDictionary = {
    chevelle: {
        name: "Chevelle",
        price: 80000,
        image: "/WebshopImages/classic1.jpg",
        alt: "Chevelle"
    },
    cadillac: {
        name: "Cadillac",
        price: 50000,
        image: "/WebshopImages/classic2.jpg",
        alt: "Cadillac"
    },
    cobra: {
        name: "Cobra",
        price: 250000,
        image: "/WebshopImages/classic3.jpg",
        alt: "Cobra"
    },
    mustang: {
        name: "Mustang",
        price: 50000,
        image: "/WebshopImages/classic4.jpg",
        alt: "Mustang"
    },
    bmw: {
        name: "BMW",
        price: 50000,
        image: "/WebshopImages/classic5.jpg",
        alt: "BMW"
    }
};