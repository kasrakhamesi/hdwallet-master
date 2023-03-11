import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common'
import { Currencies } from '@modules/currencies/entities/currencies.entity'
import { EthereumService } from '@packages/ethereum/ethereum.service'
import {
  RestoreAddressFromPrivateKeyDto,
  GenerateAddressDto,
  TransferDto
} from './dto/wallet.dto'
import { ITransactionsResponse } from '@packages/coins.interface'
const bip39 = require('bip39')

@Injectable()
export class WalletService {
  constructor(
    private readonly ethereumService: EthereumService,
    @Inject('CURRENCIES_REPOSITORY')
    private currenciesRepository: typeof Currencies
  ) {}

  public async generateMnemonic() {
    const mnemonic = await bip39.generateMnemonic()
    return { mnemonic }
  }

  public async generateAddresses(generateAddressDto: GenerateAddressDto) {
    if (!bip39.validateMnemonic(generateAddressDto.mnemonic))
      throw new HttpException('Invalid mnemonic', HttpStatus.BAD_REQUEST)

    const currencies = await this.currenciesRepository.findAll({
      attributes: [
        'id',
        'name',
        'symbol',
        'decimals',
        'icon',
        'blockchain',
        'network',
        'chainId'
      ]
    })
    if (!currencies)
      throw new HttpException('Currencies is Empty', HttpStatus.BAD_REQUEST)
    const addresses = []
    for (const currency of currencies) {
      const address = await this[
        `${currency.blockchain}Service`
      ].generateAddress({
        mnemonic: generateAddressDto.mnemonic,
        deriveIndex: generateAddressDto.deriveIndex
      })
      addresses.push({ ...currency.dataValues, ...address })
    }
    return addresses
  }

  public async generateAddress(
    id: string,
    generateAddressDto: GenerateAddressDto
  ) {
    if (!bip39.validateMnemonic(generateAddressDto.mnemonic))
      throw new HttpException('Invalid mnemonic', HttpStatus.BAD_REQUEST)

    const currency = await this.currenciesRepository.findOne({
      where: {
        id
      },
      attributes: ['id', 'blockchain']
    })
    if (!currency)
      throw new HttpException(
        'Blockchain not find in list',
        HttpStatus.BAD_REQUEST
      )

    return await this[`${currency.blockchain}Service`].generateAddress(
      generateAddressDto
    )
  }

  public async restoreAddressFromPrivateKey(
    id: string,
    restoreAddressFromPrivateKeyDto: RestoreAddressFromPrivateKeyDto
  ) {
    const currency = await this.currenciesRepository.findOne({
      where: {
        id
      },
      attributes: ['id', 'blockchain']
    })
    if (!currency)
      throw new HttpException(
        'Blockchain not find in list',
        HttpStatus.BAD_REQUEST
      )

    return await this[
      `${currency.blockchain}Service`
    ].restoreAddressFromPrivateKey(restoreAddressFromPrivateKeyDto)
  }

  public async balance(id: string, address: string) {
    const currency = await this.currenciesRepository.findOne({
      where: {
        id
      },
      attributes: ['id', 'decimals', 'blockchain', 'contractAddress']
    })
    if (!currency)
      throw new HttpException(
        'Blockchain not find in list',
        HttpStatus.BAD_REQUEST
      )

    return await this.ethereumService.balance({
      address,
      contract: currency.contractAddress
    })
  }

  public async transactions(id: string, address: string) {
    try {
      const currency = await this.currenciesRepository.findOne({
        where: {
          id
        },
        attributes: ['id', 'decimals', 'blockchain', 'contractAddress']
      })
      if (!currency)
        throw new HttpException(
          'Blockchain not find in list',
          HttpStatus.BAD_REQUEST
        )

      const r = await this[`${currency.blockchain}Service`].transactions({
        address,
        contract: currency.contractAddress
      })

      const newTransactions = r.map((item: ITransactionsResponse) => {
        return {
          ...item,
          value: item.value / 10 ** currency.decimals
        }
      })
      return newTransactions
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }

  public async transaction(id: string, transactionId: string) {
    const currency = await this.currenciesRepository.findOne({
      where: {
        id
      },
      attributes: ['id', 'decimals', 'blockchain', 'contractAddress']
    })
    if (!currency)
      throw new HttpException(
        'Blockchain not find in list',
        HttpStatus.BAD_REQUEST
      )
    const newTransaction = await this[
      `${currency.blockchain}Service`
    ].transaction({
      transactionId
    })
    newTransaction.value = newTransaction.value / 10 ** currency.decimals
    return newTransaction
  }

  public async transfer(id: string, transferDto: TransferDto) {
    const currency = await this.currenciesRepository.findOne({
      where: {
        id
      },
      attributes: ['id', 'decimals', 'blockchain', 'contractAddress', 'chainId']
    })
    if (!currency)
      throw new HttpException(
        'Blockchain not find in list',
        HttpStatus.BAD_REQUEST
      )

    transferDto.value = transferDto.value * 10 ** currency.decimals
    return await this.ethereumService.transfer({
      fromPrivateKey: transferDto.fromPrivateKey,
      toAddress: transferDto.toAddress,
      value: transferDto.value,
      contract: currency.contractAddress,
      chain: currency.chainId.toString()
    })
  }
}
