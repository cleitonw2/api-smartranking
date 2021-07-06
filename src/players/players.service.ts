import { Injectable, Logger } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { IPlayer } from './interfaces/player.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PlayersService {

    private readonly logger = new Logger();

    private players: IPlayer[] = [];

    async crateAndUpdatePlayer(
        createPlayerDto: CreatePlayerDto
    ): Promise<void> {
        const player = await this.create(createPlayerDto);
    }

    private create(createPlayerDto: CreatePlayerDto): IPlayer {
        const { name, email, phone } = createPlayerDto;

        const player: IPlayer = {
            _id: uuid(),
            name,
            email,
            phone,
            photoUrl: "localhost:3000/photo/user.png",
            ranking: "A",
            rankingPosition: 3,
        }

        this.players.push(player);

        this.logger.log(`createPlayerDto ${JSON.stringify(player)}`);
        
        return player;
    }
}
