import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common'
import { Currencies } from '@src/currencies/entities/currencies.entity'
import {
  RestoreAddressFromPrivateKeyDto,
  GenerateAddressDto,
  TransferDto
} from './dto/wallet.dto'
import axios from 'axios'

const axiosClient = axios.create({ baseURL: 'http://localhost:3001' })
const axiosRequest = async ({ ...config }): Promise<any> => {
  try {
    const { data } = await axiosClient({ ...config })
    return data
  } catch (e) {
    throw new HttpException(
      e?.response?.data || e.message,
      HttpStatus.BAD_REQUEST
    )
  }
}

@Injectable()
export class WalletService {
  constructor(
    @Inject('CURRENCIES_REPOSITORY')
    private currenciesRepository: typeof Currencies
  ) {}

  public async generateMnemonic() {
    return await axiosRequest({
      url: '/wallet/mnemonic/generate',
      method: 'get'
    })
  }

  public async generateAddresses(generateAddressDto: GenerateAddressDto) {
    const addresses = await axiosRequest({
      url: '/wallet/blockchains/addresses/generate',
      method: 'post',
      data: generateAddressDto
    })
    const currencies = await this.currenciesRepository.findAll({
      attributes: [
        'id',
        'name',
        'symbol',
        'decimals',
        'icon',
        'blockchain',
        'network'
      ]
    })
    if (!currencies)
      throw new HttpException('Currencies is Empty', HttpStatus.BAD_REQUEST)
    const data = []
    for (const address of addresses.data) {
      if (
        currencies.filter((item) => item.blockchain === address.blockchain)
          .length !== 0
      )
        data.push({
          ...currencies.filter(
            (item) => item.blockchain === address.blockchain
          )[0].dataValues,
          address: address.address,
          privateKey: address.privateKey
        })
    }

    return data
  }

  public async generateAddress(
    id: string,
    generateAddressDto: GenerateAddressDto
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

    return await axiosRequest({
      url: `/wallet/blockchain/${currency.blockchain}/address/generate`,
      method: 'post',
      data: generateAddressDto
    })
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
    return await axiosRequest({
      url: `/wallet/blockchain/${currency.blockchain}/address/restore`,
      method: 'post',
      data: restoreAddressFromPrivateKeyDto
    })
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
    const url = currency.contractAddress
      ? `/wallet/blockchain/${currency.blockchain}/address/${address}/balance?contract=${currency.contractAddress}`
      : `/wallet/blockchain/${currency.blockchain}/address/${address}/balance`
    const data = await axiosRequest({
      url,
      method: 'get'
    })
    data.balance = data.balance / currency.decimals
    return data
  }

  public async transactions(id: string, address: string) {
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
    const url = currency.contractAddress
      ? `/wallet/blockchain/${currency.blockchain}/address/${address}/transactions?contract=${currency.contractAddress}`
      : `/wallet/blockchain/${currency.blockchain}/address/${address}/transactions`
    const data = await axiosRequest({
      url,
      method: 'get'
    })
    return data
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
    const url = `wallet/blockchain/${currency.blockchain}/transaction/${transactionId}`
    const data = await axiosRequest({
      url,
      method: 'get'
    })
    return data
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
    const url = currency.contractAddress
      ? `/wallet/blockchain/${currency.blockchain}/address/transfer?contract=${currency.contractAddress}=chain${currency.chainId}`
      : `/wallet/blockchain/${currency.blockchain}/address/transfer`

    transferDto.value = transferDto.value * 10 ** currency.decimals
    const data = await axiosRequest({
      url,
      method: 'post',
      data: transferDto
    })
    return data
  }
}
