import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CurrenciesModule } from './currencies/currencies.module'
import { WalletModule } from './wallet/wallet.module'
import { ConfigModule } from '@nestjs/config'
import { SeederModule } from 'nestjs-sequelize-seeder'
import { SequelizeModule } from '@nestjs/sequelize'
import { Currencies } from './currencies/entities/currencies.entity'

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'kasra123',
      database: 'hdwallet',
      models: [Currencies]
    }),
    CurrenciesModule,
    WalletModule,
    ConfigModule.forRoot({ isGlobal: true }),
    SeederModule.forRoot({
      runOnlyIfTableIsEmpty: true,
      isGlobal: true
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
