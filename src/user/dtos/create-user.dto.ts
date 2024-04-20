import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, Matches, ValidateIf } from "class-validator"
import { MatchField } from "../../validators/match-field.validator"

export class CreateUserDto {
    @ApiProperty({
        description: 'Name of user.',
        example: 'Sakuta',
        type: String
    })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({
        description: 'Email of user.',
        example: 'sakuta@gmail.com',
        type: String
    })
    @IsEmail()
    email: string

    @ApiProperty({
        description: 'Password of user.',
        example: 'sakuta123',
        type: String
    })
    @IsString()
    @IsNotEmpty()
    password: string

    @ApiProperty({
        description: 'Confirm the password it must match the password that is entered above.',
        example: 'test123',
        type: String
    })
    @MatchField('password')
    @IsNotEmpty()
    confirmPassword: string
}