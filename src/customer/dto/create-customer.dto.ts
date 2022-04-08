import { IsString, IsNotEmpty } from 'class-validator';
export class CreateCustomerDto {
  @IsString()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;
}
