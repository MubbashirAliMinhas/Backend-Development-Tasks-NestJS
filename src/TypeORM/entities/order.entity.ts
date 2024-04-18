import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { PurchasedProduct } from "./purchased-product.entity";

@Entity({ name: 'orders' })
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, user => user.orders)
    user: User

    @OneToMany(() => PurchasedProduct, purchasedProduct => purchasedProduct.order, { cascade: ['insert'] })
    purchasedProduct: PurchasedProduct[]

    @Column()
    totalPrice: number

    @CreateDateColumn()
    createdAt: Date
}