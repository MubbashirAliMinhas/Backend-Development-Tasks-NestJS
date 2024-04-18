import { ApiProperty } from "@nestjs/swagger"

export class CreateProductDto {
    @ApiProperty({
        description: 'Name of the product.',
        example: 'Pasta',
    })
    name: string

    @ApiProperty({
        description: 'price of the product.',
        example: 200,
    })
    price: number

    @ApiProperty({
        description: 'Quantity of the product.',
        example: 10,
    })
    quantity: number
}