import { BadRequestException, Body, ValidationError, ValidationPipe } from "@nestjs/common"

export const NestedBody = () => {
    return Body(new ValidationPipe({
        stopAtFirstError: true,
        whitelist: true,
        exceptionFactory: (errors: ValidationError[]) => {
          const messageArray = []
          errors.map(error => {
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
          })
    
          return new BadRequestException(messageArray)
        }
      }))
}