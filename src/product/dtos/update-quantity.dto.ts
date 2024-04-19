import { PickType } from "@nestjs/swagger";
import { CreateProductDto } from "./create-product.dto";

export class UpdateQuantityDto extends PickType(CreateProductDto, ['quantity'] as const) {}