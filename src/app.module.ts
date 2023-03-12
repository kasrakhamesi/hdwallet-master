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
      dialect: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'kasra123',
      database: 'hdwallet',
      models: [Currencies],
      autoLoadModels: true
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
