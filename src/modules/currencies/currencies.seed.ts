import { Seeder, OnSeederInit } from 'nestjs-sequelize-seeder'
import { Currencies } from './entities/currencies.entity'

@Seeder({
  model: 'currencies'
})
export class SeedCurrencies implements OnSeederInit {
  run() {
    return [
      {
        blockchain: 'ethereum',
        name: 'ethereum',
        symbol: 'ETH',
        type: 'coin',
        network: 'erc20',
        confirmationBlock: 30,
        contractAddress: null,
        chainId: 1,
        decimals: 18,
        icon: 'https://google.com',
        enabled: true
      }
    ] as Currencies[]
  }

  everyone(data: any) {
    data.created_at = new Date().toISOString()
    data.updated_at = new Date().toISOString()

    return data
  }
}
