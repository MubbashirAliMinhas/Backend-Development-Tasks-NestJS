import { BadRequestException, Body, createParamDecorator, ExecutionContext, ValidationError, ValidationPipe } from "@nestjs/common"
import { Request } from "express"

const CustomBody = createParamDecorator((data: any, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest()
    return request.body
})

export const NestedBody = () => {
    return CustomBody(new ValidationPipe({
        validateCustomDecorators: true,
        stopAtFirstError: true,
        whitelist: true,
            exceptionFactory: (errors: ValidationError[]) => {
            const messageArray = []
            errors.map(error => {
                if (error.children.length != 0) {
                    error.children.map(innerError => {
                        innerError.children.map(deepError => {
                            const message = Object.values(deepError.constraints)[0]
                            const fieldArray = []
                            fieldArray.push(error.property)
                            fieldArray.push(innerError.property)
                            fieldArray.push(deepError.property)
                            messageArray.push({
                                field: fieldArray,
                                message
                            })
                        })
                    })
                } else {
                    messageArray.push(Object.values(error.constraints)[0])
                }
                
            })
    
            return new BadRequestException(messageArray)
        }
      }))
}