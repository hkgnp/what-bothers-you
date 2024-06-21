import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ItemEntity } from './items/item.entity/item.entity';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mongodb',
          url: configService.get<string>('DATABASE_URL'),
          ssl: true,
          synchronize: true,
          useUnifiedTopology: true,
          entities: [ItemEntity],
        };
      },
      inject: [ConfigService],
    }),
    ItemsModule,
  ],
})
export class AppModule {}
