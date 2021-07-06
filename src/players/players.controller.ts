import { Body, Controller, Post } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {

    constructor(
        private readonly playersServices: PlayersService
    ) { }

    @Post()
    async createAndUpdatePlayer(
        @Body() createPlayerDto: CreatePlayerDto
    ) {
        await this.playersServices.crateAndUpdatePlayer(createPlayerDto);
    }
}
