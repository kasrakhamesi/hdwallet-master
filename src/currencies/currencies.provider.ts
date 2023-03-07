import { Currencies } from './entities/currencies.entity'

export const currenciesProviders = [
  {
    provide: 'CURRENCIES_REPOSITORY',
    useValue: Currencies
  }
]
