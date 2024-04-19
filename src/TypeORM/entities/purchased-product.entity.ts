import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: 'purchased_products'})
export class PurchasedProduct {
    @ApiProperty({
        description: 'Id of the purchased product.',
        example: 5,
        type: Number
    })
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Order, order => order.purchasedProduct)
    order: Order

    @ApiProperty({
        description: 'Name of the purchased product.',
        example: 'Pasta',
        type: String
    })
    @Column()
    name: string

    @ApiProperty({
        description: 'Price of the purchased product.',
        example: 300,
        type: Number
    })
    @Column()
    price: number

    @ApiProperty({
        description: 'Quantity of the purchased product.',
        example: 11,
        type: Number
    })
    @Column()
    quantity: number
}