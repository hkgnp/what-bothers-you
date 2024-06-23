import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ObjectId } from 'mongodb'
import { Repository } from 'typeorm'

import { ItemEntity } from './item.entity/item.entity'

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ItemEntity)
    private readonly itemRepository: Repository<ItemEntity>,
  ) {}

  async findAll(): Promise<ItemEntity[]> {
    return await this.itemRepository.find()
  }

  async findOne(id: string): Promise<ItemEntity> {
    const objectId = new ObjectId(id)
    return await this.itemRepository.findOne({ where: { _id: objectId } })
  }

  async create(item: ItemEntity): Promise<ItemEntity> {
    return await this.itemRepository.save(item)
  }

  async update(id: string, item: ItemEntity): Promise<ItemEntity> {
    const objectId = new ObjectId(id)
    await this.itemRepository.update(objectId, item)
    return this.findOne(id)
  }

  async remove(id: string): Promise<void> {
    await this.itemRepository.delete(id)
  }
}
