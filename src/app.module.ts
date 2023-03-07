import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { CurrenciesModule } from './currencies/currencies.module';

@Module({
  imports: [CurrenciesModule],
  controllers: [AppController],
  providers: [AppService,DatabaseModule],
})
export class AppModule {}
