import { CreatePurchasedProductDto } from "./create-purchased-product.dto";

export class CreateOrderDto {
    products: CreatePurchasedProductDto[]
}