
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateTicketInput {
    order_id?: Nullable<string>;
    customer_id?: Nullable<number>;
    subtotal?: Nullable<number>;
    discount?: Nullable<number>;
    total_tax?: Nullable<number>;
    total?: Nullable<number>;
}

export class Customer {
    cid: number;
    first_name?: Nullable<string>;
    last_name?: Nullable<string>;
    store_id?: Nullable<number>;
    sub_id?: Nullable<number>;
}

export abstract class IQuery {
    abstract tickets(): Nullable<Nullable<Ticket>[]> | Promise<Nullable<Nullable<Ticket>[]>>;

    abstract ticket(id: string): Nullable<Ticket> | Promise<Nullable<Ticket>>;
}

export abstract class IMutation {
    abstract createTicket(CreateTicketInput?: Nullable<CreateTicketInput>): Nullable<Ticket> | Promise<Nullable<Ticket>>;
}

export class Ticket {
    id?: Nullable<number>;
    order_id?: Nullable<string>;
    customer_id?: Nullable<number>;
    store_id?: Nullable<number>;
    sub_id?: Nullable<number>;
    subtotal?: Nullable<number>;
    discount?: Nullable<number>;
    total_tax?: Nullable<number>;
    total?: Nullable<number>;
    customer?: Nullable<Customer>;
}

type Nullable<T> = T | null;
