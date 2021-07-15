import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { IPlayer } from './interfaces/player.interface';
import { ParametersValidationPipe } from '../common/pipes/parameter-validation.pipe';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {

    constructor(
        private readonly playersServices: PlayersService
    ) { }

    @Post()
    @UsePipes(ValidationPipe)
    async createPlayer(
        @Body() createPlayerDto: CreatePlayerDto
    ): Promise<IPlayer> {

        return await this.playersServices.createPlayer(createPlayerDto);
    }

    @Put("/:_id")
    @UsePipes(ValidationPipe)
    async updatePlayer(
        @Body() updatePlayerDto: UpdatePlayerDto,
        @Param("_id", ParametersValidationPipe) _id: string
    ): Promise<void> {

        await this.playersServices.updatePlayer(_id, updatePlayerDto);
    }

    @Get()
    async showPlayers(): Promise<IPlayer[]> {

        return await this.playersServices.showPlayers();
    }

    @Get("/:_id")
    async showPlayerById(
        @Param("_id", ParametersValidationPipe) _id: string
    ): Promise<IPlayer> {

        return await this.playersServices.showPlayerById(_id);
    }

    @Delete("/:_id")
    async deletePlayer(
        @Param("_id", ParametersValidationPipe) _id: string
    ): Promise<void> {

        await this.playersServices.delete(_id);
    }
}
