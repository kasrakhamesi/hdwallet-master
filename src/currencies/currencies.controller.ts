import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CurrenciesService } from './currencies.service'
import { CreateCurrencyDto } from './dto/create-currency.dto'
import { UpdateCurrencyDto } from './dto/update-currency.dto'

@ApiTags('Currencies')
@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Post()
  create(@Body() createCurrencyDto: CreateCurrencyDto) {
    return {
      statusCode: 201,
      data: this.currenciesService.create(createCurrencyDto)
    }
  }

  @Get()
  findAll() {
    return { statusCode: 200, data: this.currenciesService.findAll() }
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return { statusCode: 200, data: this.currenciesService.findOne(+id) }
  }

  @Patch('id/:id')
  update(
    @Param('id') id: string,
    @Body() updateCurrencyDto: UpdateCurrencyDto
  ) {
    return {
      statusCode: 200,
      data: this.currenciesService.update(+id, updateCurrencyDto)
    }
  }

  @Delete('id/:id')
  remove(@Param('id') id: string) {
    return { statusCode: 200, data: this.currenciesService.remove(+id) }
  }
}
