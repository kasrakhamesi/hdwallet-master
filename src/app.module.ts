import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DatabaseModule } from './core/database/database.module'
import { CurrenciesModule } from './currencies/currencies.module'
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [CurrenciesModule, WalletModule],
  controllers: [AppController],
  providers: [AppService, DatabaseModule]
})
export class AppModule {}
