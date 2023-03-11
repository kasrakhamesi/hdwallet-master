import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Put,
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
  async create(@Body() createCurrencyDto: CreateCurrencyDto) {
    return {
      statusCode: 201,
      data: await this.currenciesService.create(createCurrencyDto)
    }
  }

  @Get()
  async findAll() {
    return {
      statusCode: 200,
      data: await this.currenciesService.findAll()
    }
  }

  @Get('id/:id')
  async findOne(@Param('id') id: string) {
    return {
      statusCode: 200,
      data: await this.currenciesService.findOne(+id)
    }
  }

  @Put('id/:id')
  async update(
    @Param('id') id: string,
    @Body() updateCurrencyDto: UpdateCurrencyDto
  ) {
    return {
      statusCode: 200,
      data: await this.currenciesService.update(+id, updateCurrencyDto)
    }
  }

  @Delete('id/:id')
  async remove(@Param('id') id: string) {
    return {
      statusCode: 200,
      data: await this.currenciesService.remove(+id)
    }
  }
}
