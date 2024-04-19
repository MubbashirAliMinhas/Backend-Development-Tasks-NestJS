import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'products' })
export class Product {
    @ApiProperty({
        description: 'Id of the product.',
        example: 3,
        type: Number
    })
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({
        description: 'Name of the product.',
        example: 'Pasta',
        type: String
    })
    @Column()
    name: string

    @ApiProperty({
        description: 'Price of the product.',
        example: 300,
        type: Number
    })
    @Column()
    price: number

    @ApiProperty({
        description: 'Quantity of the product.',
        example: 10,
        type: Number
    })
    @Column()
    quantity: number
}