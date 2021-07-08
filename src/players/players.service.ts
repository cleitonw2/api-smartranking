import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { IPlayer } from './interfaces/player.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PlayersService {

    private players: IPlayer[] = [];

    async crateAndUpdatePlayer(
        createPlayerDto: CreatePlayerDto
    ): Promise<void> {

        const { email } = createPlayerDto;
        const playerExists = this.players
            .find(player => player.email === email);

        if (!playerExists) {
            this.create(createPlayerDto);
        } else {
            this.update(playerExists, createPlayerDto);
        }
    }

    async showPlayers(): Promise<IPlayer[]> {

        return this.players
    }

    async showPlayerByEmail(email: string): Promise<IPlayer> {

        const playerExists = this.players.find(player => player.email === email);

        if (!playerExists) {
            throw new NotFoundException("Jogador não encontrado!");
        }

        return playerExists;
    }

    async delete(email: string): Promise<void> {

        const player = this.players.find(player => player.email === email);

        this.players = this.players.filter(p => p.email != player.email);
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

        return player;
    }

    private update(
        player: IPlayer, createPlayerDto: CreatePlayerDto
    ): void {

        const { name } = createPlayerDto;
        player.name = name;
    }
}
