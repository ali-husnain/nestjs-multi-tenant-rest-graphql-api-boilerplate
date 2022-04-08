import { ParseIntPipe } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Ticket } from '../graphql.schema';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { GraphqlRequest } from 'src/decorators/graphql-request.decorator';
import { CustomerService } from 'src/services';

@Resolver('Ticket')
export class TicketResolver {
  constructor(
    private readonly ticketService: TicketService,
    private readonly customerService: CustomerService,
  ) {}

  @Query('tickets')
  async getTickets(@GraphqlRequest() request) {
    const currentUser = request.session.user;
    return this.ticketService.findAll(currentUser);
  }

  @Query('ticket')
  async getTicket(
    @Args('id', ParseIntPipe)
    id: number,
    @GraphqlRequest() request,
  ): Promise<Ticket> {
    const currentUser = request.session.user;
    return this.ticketService.ticketById(id, currentUser);
  }

  @ResolveField()
  async customer(@Parent() getTicket) {
    const { customer_id } = getTicket;
    return await this.customerService.findOne(customer_id);
  }

  @Mutation('createTicket')
  async create(
    @Args('createTicketInput') args: CreateTicketDto,
  ): Promise<Ticket> {
    const createdTicket = await this.ticketService.create(args);
    return createdTicket;
  }
}
