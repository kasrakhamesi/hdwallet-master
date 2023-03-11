import { Module } from '@nestjs/common'
import { WalletService } from './wallet.service'
import { WalletController } from './wallet.controller'
import { CurrenciesModule } from '@modules/currencies/currencies.module'
import { currenciesProviders } from '@modules/currencies/currencies.provider'
import { EthereumService } from '@packages/ethereum/ethereum.service'

@Module({
  imports: [CurrenciesModule],
  controllers: [WalletController],
  providers: [WalletService, EthereumService, ...currenciesProviders]
})
export class WalletModule {}
