import { Table, Column, Model } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'

@Table({
  modelName: 'currencies'
})
export class Currencies extends Model {
  @Column({
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  })
  id: string

  @Column({
    allowNull: false
  })
  name: string

  @Column({
    allowNull: false
  })
  symbol: string

  @Column({
    allowNull: false
  })
  type: 'coin' | 'token'

  @Column
  network: string

  @Column({
    defaultValue: 30
  })
  confirmationBlock: number

  @Column
  contractAddress: string

  @Column
  chainId: number

  @Column({
    allowNull: false
  })
  decimal: number

  @Column
  icon: string

  @Column
  networkFee: number

  @Column({
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false
  })
  enabled: boolean
}
