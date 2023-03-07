import { Sequelize } from 'sequelize-typescript'
import { Currencies } from '@src/currencies/entities/currencies.entity'

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'hdwallet'
      })
      sequelize.addModels([Currencies])
      await sequelize.sync()
      return sequelize
    }
  }
]
