import { ApiProperty } from "@nestjs/swagger";
import { CreatePurchasedProductDto } from "./create-purchased-product.dto";
import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";

export class CreateOrderDto {

    @ApiProperty({
        description: 'Products that are added to the order. (Order of user)',
        type: [CreatePurchasedProductDto],
        example: [
            {
                id: 1,
                quantity: 2
            }, 
            {
                id: 3,
                quantity: 4
            }
        ]
    })
    @ValidateNested({ each: true })
    @Type(() => CreatePurchasedProductDto)
    @IsArray({
        message: 'Please input product array.'
    })
    products: CreatePurchasedProductDto[]
}