import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { ItemEntity } from './item.entity/item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ItemEntity])],
  providers: [ItemsService],
  controllers: [ItemsController],
})
export class ItemsModule {}
