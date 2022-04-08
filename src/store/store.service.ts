import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from '../entities/store.entity';
import { DbManager } from 'src/common/utils/db-manager.utils';

@Injectable()
export class StoreService {
  private readonly storeRepository: Repository<Store>;
  constructor(private readonly dbManager: DbManager) {
    this.storeRepository = dbManager._masterDb.getRepository(Store);
  }

  create(createStoreDto: CreateStoreDto) {
    return 'This action adds a new store';
  }

  async findAll(): Promise<Store[]> {
    return await this.storeRepository.find({ sub_id: 13 });
  }

  findOne(id: number) {
    return this.storeRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateStoreDto: UpdateStoreDto) {
    return `This action updates a #${id} store`;
  }

  remove(id: number) {
    return `This action removes a #${id} store`;
  }
}
