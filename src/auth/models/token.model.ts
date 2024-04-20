import { ApiProperty } from "@nestjs/swagger";

export class TokenResponseModel {
    @ApiProperty({
        description: 'JWT token.',
        type: String,
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzEzNjIxMDA2LCJleHAiOjE3MTM3MDc0MDZ9.AQerJXislPXetFiOIrLH6exqB1eMYq-zzEGwt-3Du1N'
    })
    token: string
}