import { Injectable, Inject } from '@nestjs/common'
import { CreateCurrencyDto } from './dto/create-currency.dto'
import { UpdateCurrencyDto } from './dto/update-currency.dto'
import { Currencies } from './entities/currencies.entity'

@Injectable()
export class CurrenciesService {
  constructor(
    @Inject('CURRENCIES_REPOSITORY')
    private currenciesRepository: typeof Currencies
  ) {}

  async create(createCurrencyDto: CreateCurrencyDto) {
    const data: any = createCurrencyDto
    return await this.currenciesRepository.create(data)
  }

  async findAll() {
    return await this.currenciesRepository.findAll()
  }

  async findOne(id: number) {
    return await this.currenciesRepository.findByPk(id)
  }

  async update(id: number, updateCurrencyDto: UpdateCurrencyDto) {
    return await this.currenciesRepository.update(updateCurrencyDto, {
      where: { id }
    })
  }

  async remove(id: number) {
    return await this.currenciesRepository.destroy({
      where: { id }
    })
  }
}
