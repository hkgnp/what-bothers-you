import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ItemsModule } from './items/items.module';
import { ItemEntity } from './items/item.entity/item.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get<string>(process.env.DATABASE_URL),
        synchronize: true,
        useUnifiedTopology: true,
        entities: [ItemEntity],
      }),
      inject: [ConfigService],
    }),
    ItemsModule,
  ],
})
export class AppModule {}
