import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketResolver } from './ticket.resolver';
import { CustomerService } from 'src/services';
import { Customer } from 'src/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbManager } from 'src/common/utils/db-manager.utils';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [TicketService, TicketResolver, CustomerService, DbManager],
})
export class TicketModule {}
