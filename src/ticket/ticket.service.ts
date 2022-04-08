import { Injectable } from '@nestjs/common';
import { DbManager } from 'src/common/utils/db-manager.utils';
import { Ticket, User } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Injectable()
export class TicketService {
  private ticketRepository: Repository<Ticket>;
  constructor(private readonly dbManager: DbManager) {
    this.ticketRepository = dbManager._db.getRepository(Ticket);
  }

  create(ticket: CreateTicketDto): CreateTicketDto {
    return ticket;
  }

  async findAll(user: User): Promise<Ticket[]> {
    return this.ticketRepository.find({
      where: {
        sub_id: user.sub_id,
      },
      take: 10,
    });
  }

  async ticketById(id: number, user: User): Promise<Ticket> {
    return this.ticketRepository.findOne({
      where: {
        id: id,
        sub_id: user.sub_id,
      },
    });
  }
}
