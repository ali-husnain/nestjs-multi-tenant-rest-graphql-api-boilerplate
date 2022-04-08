import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from 'src/entities/customer.entity';
import { Repository } from 'typeorm';
import { DbManager } from 'src/common/utils/db-manager.utils';

@Injectable()
export class CustomerService {
  private mastercustomerRepository: Repository<Customer>;
  private customerRepository: Repository<Customer>;
  constructor(private readonly dbManager: DbManager) {
    this.customerRepository = dbManager._db.getRepository(Customer);
    this.mastercustomerRepository = dbManager._masterDb.getRepository(Customer);
  }

  create(createCustomerDto: CreateCustomerDto) {
    return createCustomerDto;
  }

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find({ take: 10 });
  }

  findOne(id: number): Promise<Customer> {
    return this.customerRepository.findOne({
      where: {
        cid: id,
      },
    });
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
