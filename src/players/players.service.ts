import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { IPlayer } from './interfaces/player.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdatePlayerDto } from './dtos/update-player.dto';

@Injectable()
export class PlayersService {

    constructor(
        @InjectModel("Player")
        private readonly playerModel: Model<IPlayer>
    ) { }

    private async playerAlradyExists(_id: string): Promise<IPlayer> {
        const playerExists = await this.playerModel.findOne({ _id }).exec();

        if (!playerExists) {
            throw new NotFoundException(`Jogador com o id: ${_id}, não existe!`);
        }

        return playerExists;
    }

    async createPlayer(
        createPlayerDto: CreatePlayerDto
    ): Promise<IPlayer> {

        const { email } = createPlayerDto;

        const playerExists = await this.playerModel
            .findOne({ email });

        if (playerExists) {
            throw new BadRequestException(`O email: ${email} já está em uso!`);
        }

        const player = new this.playerModel(createPlayerDto);

        return await player.save();
    }

    async updatePlayer(
        _id: string, updatePlayerDto: UpdatePlayerDto
    ): Promise<void> {

        await this.playerAlradyExists(_id);

        await this.playerModel.findOneAndUpdate(
            { _id },
            { $set: updatePlayerDto }
        ).exec();
    }

    async showPlayers(): Promise<IPlayer[]> {

        return this.playerModel.find().exec();
    }

    async showPlayerById(_id: string): Promise<IPlayer> {

        const player = this.playerAlradyExists(_id);

        return player;
    }

    async delete(_id: string): Promise<any> {

        await this.playerAlradyExists(_id);

        return await this.playerModel.findOneAndDelete({ _id }).exec();
    }
}
