import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity({name: 'purchased_products'})
export class PurchasedProduct {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Order, order => order.purchasedProduct)
    order: Order

    @Column()
    name: string

    @Column()
    price: number

    @Column()
    quantity: number
}