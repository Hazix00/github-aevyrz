import { Product } from "./product.model";

export interface ProductsCollection {
    id: string | number;
    title: string
    routeName: string
    items: Product[]
}