import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/players.module';
import { config } from "dotenv";
config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      }),
    PlayersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
