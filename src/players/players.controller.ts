import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { IPlayer } from './interfaces/player.interface';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {

    constructor(
        private readonly playersServices: PlayersService
    ) { }

    @Post()
    async createAndUpdatePlayer(
        @Body() createPlayerDto: CreatePlayerDto
    ): Promise<void> {
        await this.playersServices.crateAndUpdatePlayer(createPlayerDto);
    }

    @Get()
    async showPlayers(
        @Query("email") email: string
    ): Promise<IPlayer[] | IPlayer> {

        if (email) {
            return this.playersServices.showPlayerByEmail(email);
        } else {
            return this.playersServices.showPlayers();
        }
    }

    @Delete()
    async deletePlayer(
        @Query("email") email: string
    ): Promise<void> {
        
        this.playersServices.delete(email);
    }
}
