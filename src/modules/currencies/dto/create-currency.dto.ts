import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator'

export class CreateCurrencyDto {
  @ApiProperty({
    description: 'blockchain',
    example: 'bitcoin'
  })
  @IsNotEmpty({ message: 'بلاکچین نباید خالی باشد' })
  blockchain: string

  @ApiProperty({
    description: 'name',
    example: 'bitcoin'
  })
  @IsNotEmpty({ message: 'نام نباید خالی باشد' })
  name: string

  @ApiProperty({
    description: 'symbol',
    example: 'BTC'
  })
  @IsNotEmpty({ message: 'سمبل نباید خالی باشد' })
  symbol: string

  @ApiProperty({
    description: 'type',
    example: 'coin'
  })
  @IsNotEmpty({ message: 'نوع رمزارز نباید خالی باشد' })
  @IsEnum(['coin', 'token'], {
    message: 'نوع رمزارز نباید چیزی جز کوین یا توکن باشد'
  })
  type: 'coin' | 'token'

  @ApiProperty({
    description: 'network',
    example: 'bep20'
  })
  network: string

  @ApiProperty({
    description: 'confirmationBlock',
    example: 30
  })
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'ConfirmationBlock should be number' }
  )
  confirmationBlock: number

  @ApiProperty({
    description: 'contractAddress',
    example: '0xdac17f958d2ee523a2206206994597c13d831ec7'
  })
  contractAddress: string

  @ApiProperty({
    description: 'chainId',
    example: 1
  })
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'ChainID should be number' }
  )
  chainId: number

  @ApiProperty({
    description: 'decimals',
    example: 1
  })
  @IsNotEmpty({ message: 'اعداد اعشاری نباید خالی باشد' })
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'Decimals should be number' }
  )
  decimals: number

  @ApiProperty({
    description: 'icon',
    example: 'https://google.com'
  })
  icon: string

  @ApiProperty({
    description: 'enabled',
    example: true
  })
  enabled: boolean
}
