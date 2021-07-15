import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayersService } from 'src/players/players.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { ICategory } from './interface/category.interface';

@Injectable()
export class CategoriesService {

    constructor(
        @InjectModel("Category")
        private readonly categoryModel: Model<ICategory>,
        private readonly playersService: PlayersService
    ) { }

    private async getCategory(category: string): Promise<ICategory> {

        const categoryExists = await this.categoryModel.findOne({ category }).exec();

        if (!categoryExists) {
            throw new NotFoundException(`A categoria: ${category} não foi encotrada!`);
        }

        return categoryExists;
    }

    async createCategory(
        createCategoryDto: CreateCategoryDto
    ): Promise<ICategory> {

        const { category } = createCategoryDto;

        const categoryExists = await this.categoryModel.findOne({ category }).exec();

        if (categoryExists) {
            throw new BadRequestException(`Categoria: ${category} já foi cadastrada!`);
        }

        const createdCategory = new this.categoryModel(createCategoryDto);

        return await createdCategory.save();
    }

    async showCategories(): Promise<Array<ICategory>> {

        return await this.categoryModel.find().populate("players").exec();
    }

    async showCategoryById(category: string): Promise<ICategory> {

        return await this.getCategory(category);
    }

    async updateCategory(
        category: string,
        updateCategoryDto: UpdateCategoryDto
    ): Promise<void> {

        await this.getCategory(category);

        await this.categoryModel.findOneAndUpdate(
            { category },
            { $set: updateCategoryDto })
            .exec();
    }

    async assignCategoryToPlayer(params: string[]): Promise<void> {

        const category = params["category"];
        const playerId = params["playerId"];

        const categoryFound = await this.getCategory(category);

        await this.playersService.showPlayerById(playerId);

        const playerRegisterdInCategory = await this.categoryModel.find({ category })
            .where("players").in(playerId).exec();

        if (playerRegisterdInCategory.length > 1) {
            throw new BadRequestException(
                `Jogador: ${playerId} já cadastrdado na categoria ${category}!`
            );
        }

        categoryFound.players.push(playerId);

        await this.categoryModel.findOneAndUpdate(
            { category },
            { $set: categoryFound }
        ).exec();
    }
}
