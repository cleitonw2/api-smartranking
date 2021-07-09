import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { IPlayer } from './interfaces/player.interface';
import { v4 as uuid } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {

    constructor(
        @InjectModel("Player")
        private readonly playerModel: Model<IPlayer>
    ) { }

    async crateAndUpdatePlayer(
        createPlayerDto: CreatePlayerDto
    ): Promise<void> {

        const { email } = createPlayerDto;

        const playerExists = await this.playerModel
            .findOne({ email });

        if (!playerExists) {
            await this.create(createPlayerDto);
        } else {
            await this.update(createPlayerDto);
        }
    }

    async showPlayers(): Promise<IPlayer[]> {

        return this.playerModel.find().exec();
    }

    async showPlayerByEmail(email: string): Promise<IPlayer> {

        const playerExists = await this.playerModel.findOne({ email }).exec();
        
        if (!playerExists) {
            throw new NotFoundException("Jogador não encontrado!");
        }

        return playerExists;
    }

    async delete(email: string): Promise<any> {

        return await this.playerModel.findOneAndDelete({ email }).exec();
    }

    private async create(createPlayerDto: CreatePlayerDto): Promise<IPlayer> {

        const player = new this.playerModel(createPlayerDto);

        return await player.save();
    }

    private async update(
        createPlayerDto: CreatePlayerDto
    ): Promise<IPlayer> {

        return await this.playerModel.findOneAndUpdate(
            { email: createPlayerDto.email },
            { $set: createPlayerDto }
        ).exec();
    }
}
