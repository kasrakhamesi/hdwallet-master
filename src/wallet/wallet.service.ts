import { Injectable } from '@nestjs/common'
import { CreateWalletDto } from './dto/create-wallet.dto'
import { UpdateWalletDto } from './dto/update-wallet.dto'
import axios from 'axios'

const axiosClient = axios.create({ url: process.env.CLOUD_WALLET_ENDPOINT })

@Injectable()
export class WalletService {
  create(createWalletDto: CreateWalletDto) {}

  findAll() {
    axiosClient.get('/wallet/generate/address')
    return `This action returns all wallet`
  }

  findOne(id: number) {
    return `This action returns a #${id} wallet`
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`
  }
}
