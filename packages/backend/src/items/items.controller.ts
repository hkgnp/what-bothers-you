import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'

import { ItemEntity } from './item.entity/item.entity'
import { ItemsService } from './items.service'

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  findAll() {
    return this.itemsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(id)
  }

  @Post()
  create(@Body() item: ItemEntity) {
    return this.itemsService.create(item)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() item: ItemEntity) {
    return this.itemsService.update(id, item)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(id)
  }
}
