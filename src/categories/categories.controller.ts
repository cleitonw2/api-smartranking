import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { ICategory } from './interface/category.interface';

@Controller('api/v1/categories')
export class CategoriesController {

    constructor(
        private readonly categoriesService: CategoriesService
    ) { }

    @Post()
    @UsePipes(ValidationPipe)
    async createCategory(
        @Body() createCategoryDto: CreateCategoryDto
    ): Promise<ICategory> {

        return await this.categoriesService
            .createCategory(createCategoryDto);
    }

    @Get()
    async showCategories(): Promise<Array<ICategory>> {

        return await this.categoriesService.showCategories();
    }

    @Get("/:category")
    async showCategoryById(
        @Param("category") category: string
    ): Promise<ICategory> {

        return await this.categoriesService.showCategoryById(category);
    }

    @Put("/:category")
    @UsePipes(ValidationPipe)
    async updateCategory(
        @Body() updateCategoryDto: UpdateCategoryDto,
        @Param("category") category: string
    ): Promise<void> {

        await this.categoriesService.updateCategory(category, updateCategoryDto);
    }

    @Post("/:category/players/:playerId")
    async assignCategoryToPlayer(
        @Param() params: string[]
    ): Promise<void> {

        await this.categoriesService.assignCategoryToPlayer(params);
    }
}
