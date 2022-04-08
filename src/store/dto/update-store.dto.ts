import { PartialType } from '@nestjs/mapped-types';
import { CreateStoreDto } from './create-store.dto';

export class UpdateStoreDto extends PartialType(CreateStoreDto) {}
