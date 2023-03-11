import { Module } from '@nestjs/common'
import { WalletService } from './wallet.service'
import { WalletController } from './wallet.controller'
import { CurrenciesModule } from '@src/currencies/currencies.module'
import { currenciesProviders } from '@src/currencies/currencies.provider'

@Module({
  imports: [CurrenciesModule],
  controllers: [WalletController],
  providers: [WalletService, ...currenciesProviders]
})
export class WalletModule {}
