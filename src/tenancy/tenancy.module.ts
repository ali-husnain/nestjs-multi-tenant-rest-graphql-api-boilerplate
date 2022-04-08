import { Global, Module, Scope } from '@nestjs/common';
import { CONNECTION } from './tenancy.symbol';
import { getTenantConnection } from './tenancy.utils';
import { REQUEST } from '@nestjs/core';
import encrypter from 'src/common/utils/encrypter.utils';

const connectionFactory = {
  provide: CONNECTION,
  scope: Scope.REQUEST,
  useFactory: async (request: any) => {
    const tenantDB = request.headers['x-tenant']
      ? encrypter.decrypt(request.headers['x-tenant'])
      : null;
    if (tenantDB) {
      return await getTenantConnection(tenantDB);
    }

    return null;
  },
  inject: [REQUEST],
};

@Global()
@Module({
  providers: [connectionFactory],
  exports: [CONNECTION],
})
export class TenancyModule {}
