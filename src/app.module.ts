import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ProfileController } from './profile/profile.controller';
import { CategoriesModule } from './categories/categories.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    UsersModule,
    //for production

    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: process.env.DB_HOST || 'localhost',
    //   port: Number(process.env.DB_PORT) || 3306,
    //   username: process.env.DB_USERNAME || 'root',
    //   password: process.env.DB_PASSWORD || 'root',
    //   database: process.env.DB_NAME || 'nestdb',
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //   synchronize: true,
    // }),

    //for localhost
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nestdb',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    CategoriesModule,
  ],
  controllers: [AppController, ProfileController],
  providers: [AppService],
})
export class AppModule {}
