import { Module } from '@nestjs/common'
import { CurrenciesService } from './currencies.service'
import { CurrenciesController } from './currencies.controller'
import { currenciesProviders } from './currencies.provider'
import { SeedCurrencies } from './currencies.seed'
import { SeederModule } from 'nestjs-sequelize-seeder'
import { SequelizeModule } from '@nestjs/sequelize'
import { Currencies } from './entities/currencies.entity'

@Module({
  imports: [
    SequelizeModule.forFeature([Currencies]),
    SeederModule.forFeature([SeedCurrencies])
  ],
  controllers: [CurrenciesController],
  providers: [CurrenciesService, ...currenciesProviders],
  exports: [SequelizeModule]
})
export class CurrenciesModule {}
