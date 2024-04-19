import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsPositive } from "class-validator"

export class CreatePurchasedProductDto {
    @ApiProperty({
        description: 'Id of the product.',
        example: 1,
        type: Number
    })
    @IsInt()
    id: number

    @ApiProperty({
        description: 'Quantity of the product.',
        example: 3,
        type: Number
    })
    @IsInt()
    @IsPositive()
    quantity: number
}