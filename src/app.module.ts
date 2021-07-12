import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/players.module';
import { config } from "dotenv";
import { CategoriesModule } from './categories/categories.module';
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
    PlayersModule,
    CategoriesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
