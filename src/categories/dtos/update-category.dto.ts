import {
    ArrayMinSize,
    IsArray,
    IsNotEmpty,
    IsString
} from "class-validator";
import { IEvent } from "../interface/category.interface";


export class UpdateCategoryDto {

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsArray()
    @ArrayMinSize(1)
    events: Array<IEvent>
}