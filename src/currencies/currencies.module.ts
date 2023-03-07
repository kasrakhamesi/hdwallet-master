import { Module } from '@nestjs/common'
import { CurrenciesService } from './currencies.service'
import { CurrenciesController } from './currencies.controller'
import { DatabaseModule } from 'src/core/database/database.module'
import { currenciesProviders } from './currencies.provider'

@Module({
  imports: [DatabaseModule],
  controllers: [CurrenciesController],
  providers: [CurrenciesService, ...currenciesProviders]
})
export class CurrenciesModule {}
