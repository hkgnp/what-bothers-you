import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ItemEntity } from './item.entity/item.entity';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

@Module({
  imports: [TypeOrmModule.forFeature([ItemEntity])],
  providers: [ItemsService],
  controllers: [ItemsController],
})
export class ItemsModule {}
