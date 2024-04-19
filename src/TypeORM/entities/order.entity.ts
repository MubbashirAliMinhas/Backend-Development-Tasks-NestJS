import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { PurchasedProduct } from "./purchased-product.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'orders' })
export class Order {
    @ApiProperty({
        description: 'Id of the order.',
        example: 10,
        type: Number
    })
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, user => user.orders)
    user: User

    @ApiProperty({
        description: 'Purchased products for the order.',
        type: [PurchasedProduct]
    })
    @OneToMany(() => PurchasedProduct, purchasedProduct => purchasedProduct.order, { cascade: ['insert'] })
    purchasedProduct: PurchasedProduct[]

    @ApiProperty({
        description: 'Total price of the order.',
        example: 10000,
        type: Number
    })
    @Column()
    totalPrice: number

    @ApiProperty({
        description: 'Date of the order when it is created.',
        example: new Date('2024-04-18 23:26:48.626307'),
        type: Date
    })
    @CreateDateColumn()
    createdAt: Date
}