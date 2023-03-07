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

  create(createCurrencyDto: CreateCurrencyDto) {
    const data: any = createCurrencyDto
    return this.currenciesRepository.create(data)
  }

  findAll() {
    return this.currenciesRepository.findAll()
  }

  findOne(id: number) {
    return this.currenciesRepository.findByPk(id)
  }

  update(id: number, updateCurrencyDto: UpdateCurrencyDto) {
    return this.currenciesRepository.update(updateCurrencyDto, {
      where: { id }
    })
  }

  remove(id: number) {
    return this.currenciesRepository.destroy({
      where: { id }
    })
  }
}
