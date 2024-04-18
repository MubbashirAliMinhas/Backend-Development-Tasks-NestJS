import { CreateProductType } from "./create-product.type"

export type CreateOrderType = {
    userId: number
    products: CreateProductType[]
}