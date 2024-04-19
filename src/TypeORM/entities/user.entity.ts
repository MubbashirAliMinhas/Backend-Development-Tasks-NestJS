import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'users' })
export class User {
    @ApiProperty({
        description: 'Id of user.',
        example: 1,
        type: Number
    })
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({
        description: 'Name of user.',
        example: 'John',
        type: String
    })
    @Column()
    name: string

    @ApiProperty({
        description: 'Email of user.',
        example: 'john@gmail.com',
        type: String
    })
    @Column({ unique: true })
    email: string

    @ApiProperty({
        description: 'Password of user.',
        example: 'test123',
        type: String
    })
    @Column()
    password: string

    @OneToMany(() => Order, order => order.user)
    orders: Order[]
}