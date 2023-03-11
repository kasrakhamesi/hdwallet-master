import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { WalletModule } from '@modules/wallet/wallet.module'
import { ConfigModule } from '@nestjs/config'
import { SeederModule } from 'nestjs-sequelize-seeder'
import { SequelizeModule } from '@nestjs/sequelize'
import { Currencies } from '@modules/currencies/entities/currencies.entity'
import { CurrenciesModule } from '@modules/currencies/currencies.module'

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
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
