import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, Min } from "class-validator"

export class CreateProductDto {
    @ApiProperty({
        description: 'Name of the product.',
        example: 'Pasta',
        type: String
    })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({
        description: 'price of the product.',
        example: 200,
        type: Number
    })
    @IsNumber()
    @Min(0)
    price: number

    @ApiProperty({
        description: 'Quantity of the product.',
        example: 10,
        type: Number
    })
    @IsInt()
    @Min(0)
    quantity: number
}