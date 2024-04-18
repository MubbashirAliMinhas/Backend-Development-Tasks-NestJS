import { PickType } from "@nestjs/mapped-types";
import { CreateProductDto } from "./create-product.dto";

export class UpdateQuantityDto extends PickType(CreateProductDto, ['quantity'] as const) {}