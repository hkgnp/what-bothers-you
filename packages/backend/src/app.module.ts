import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ItemEntity } from './items/item.entity/item.entity'
import { ItemsModule } from './items/items.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => {
        return {
          type: 'mongodb',
          url: process.env.DATABASE_URL,
          ssl: true,
          synchronize: true,
          useUnifiedTopology: true,
          entities: [ItemEntity],
        }
      },
      inject: [ConfigService],
    }),
    ItemsModule,
  ],
})
export class AppModule {}
