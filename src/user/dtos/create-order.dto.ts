import { CreateProductDto } from "./create-product.dto";

export class CreateOrderDto {
    products: CreateProductDto[]
}