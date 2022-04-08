import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DbManager } from './common/utils/db-manager.utils';

import { Mts, Store, Subdomain, User } from './entities';

@Injectable()
export class AppService {
  private readonly userRepository: Repository<User>;
  private readonly mtsRepository: Repository<Mts>;
  private readonly storeRepository: Repository<Store>;
  private readonly subdomainRepository: Repository<Subdomain>;
  constructor(private readonly dbManager: DbManager) {
    this.userRepository = dbManager._masterDb.getRepository(User);
    this.mtsRepository = dbManager._masterDb.getRepository(Mts);
    this.storeRepository = dbManager._masterDb.getRepository(Store);
    this.subdomainRepository = dbManager._masterDb.getRepository(Subdomain);
  }

  getServerRunning(): string {
    return 'Server Running...';
  }

  findAll() {
    return this.userRepository.find({ take: 10 });
  }
  findUser(id: number) {
    return this.userRepository.findOne({
      where: {
        uid: id,
      },
    });
  }
  findUserIdentity(identityParams) {
    return this.userRepository.findOne({
      where: identityParams,
      relations: ['store', 'subdomain'],
    });
  }
  findMtsConnection(sub_id) {
    return this.mtsRepository.findOne({ where: { sub_id: sub_id } });
  }

  findStore(store_id) {
    return this.storeRepository.findOne({ where: { id: store_id } });
  }

  findSubdomain(sub_id) {
    return this.subdomainRepository.findOne({ where: { sub_id: sub_id } });
  }
}
