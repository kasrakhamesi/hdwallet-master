import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common'
import { WalletService } from './wallet.service'
import {
  GenerateAddressDto,
  RestoreAddressFromPrivateKeyDto,
  TransferDto
} from './dto/wallet.dto'
import { ApiParam, ApiTags } from '@nestjs/swagger'

@ApiTags('Wallet')
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get('mnemonic/generate')
  public async generateMnemonic() {
    return await this.walletService.generateMnemonic()
  }

  @Post('/addresses/generate')
  public async generateAddresses(
    @Body() generateAddressDto: GenerateAddressDto
  ) {
    return {
      statusCode: 200,
      data: await this.walletService.generateAddresses(generateAddressDto)
    }
  }

  @Post('id/:id/address/generate')
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    example: '1'
  })
  public async generateAddress(
    @Param('id') id: string,
    @Body() generateAddressDto: GenerateAddressDto
  ) {
    return await this.walletService.generateAddress(id, generateAddressDto)
  }

  @Post('id/:id/address/restore')
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    example: '1'
  })
  public async restoreAddressFromPrivateKey(
    @Param('id') id: string,
    @Body() restoreAddressFromPrivateKeyDto: RestoreAddressFromPrivateKeyDto
  ) {
    return await this.walletService.restoreAddressFromPrivateKey(
      id,
      restoreAddressFromPrivateKeyDto
    )
  }

  @Get('id/:id/address/:address/balance')
  @ApiParam({
    name: 'address',
    type: 'string',
    required: true,
    example: '0x8044ed1A4Cc16B116C01cc2c3076263B97DFf1F5'
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    example: '1'
  })
  public async balance(
    @Param('id') id: string,
    @Param('address') address: string
  ) {
    return await this.walletService.balance(id, address)
  }

  @Get('id/:id/address/:address/transactions')
  @ApiParam({
    name: 'address',
    type: 'string',
    required: true,
    example: '0x8044ed1A4Cc16B116C01cc2c3076263B97DFf1F5'
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    example: '1'
  })
  public async transactions(
    @Param('id') id: string,
    @Param('address') address: string
  ) {
    return await this.walletService.transactions(id, address)
  }

  @Post('id/:id/address/transfer')
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    example: '1'
  })
  public async transfer(
    @Param('id') id: string,
    @Body() transferDto: TransferDto
  ) {
    return await this.walletService.transfer(id, transferDto)
  }

  @Get('id/:id/transaction/:transaction')
  @ApiParam({
    name: 'transaction',
    type: 'string',
    required: true,
    example:
      '0x9037569543b49b39fac28762811168a6a20d8e749c097ed232ffa5ba0095ff84'
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    example: '1'
  })
  public async transaction(
    @Param('id') id: string,
    @Param('transaction') transaction: string
  ) {
    return await this.walletService.transaction(id, transaction)
  }
}
