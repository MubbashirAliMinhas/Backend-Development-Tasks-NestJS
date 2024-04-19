import { registerDecorator, ValidatorOptions, ValidationArguments } from "class-validator";

export function MatchField(property: string, validationOptions?: ValidatorOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            name: 'matchField',
            target: object.constructor,
            propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const [ relatedPropertyName ] = args.constraints
                    const relatedValue = (args.object as any)[relatedPropertyName]
                    return value == relatedValue
                },

                defaultMessage(args: ValidationArguments) {
                    const [ relatedPropertyName ] = args.constraints
                    return `${propertyName} must match ${relatedPropertyName}.`
                }
            }
        })
    }
}