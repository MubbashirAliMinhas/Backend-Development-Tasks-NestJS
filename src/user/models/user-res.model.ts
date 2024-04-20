import { ApiProperty } from "@nestjs/swagger"

export class UserResponseModel {
    @ApiProperty({
        description: 'Id of user.',
        type: Number,
        example: 3
    })
    id: number

    @ApiProperty({
        description: 'Name of user.',
        type: String,
        example: 'Hikigaya'
    })
    name: string

    @ApiProperty({
        description: 'Email of user.',
        type: String,
        example: 'hikigaya@gmail.com'
    })
    email: string
}