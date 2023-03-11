export interface IGenerateAddress {
  mnemonic: string
  deriveIndex: number | null | undefined
}

export interface IBalance {
  address: string
  contract: string | null | undefined
}

export interface IBalanceResponse {
  balance: number
}

export interface ITransactions {
  address: string
  contract: string | null | undefined
}

export interface ITransaction {
  transactionId: string
}

export interface ITransactionResponse {
  transactionId: string
  timestamp: number
  value: number
  confirmations: number
  from: string
  to: string
  contract: string | null | undefined
  error: boolean
}

export interface ITransactionsResponse {
  transactionId: string
  timestamp: number
  value: number
  confirmations: number
  type: string
  contract: string | null | undefined
  error: boolean
}

export interface IGenerateAddressResponse {
  address: string
  privateKey: string
}

export interface IRestoreAddressFromPrivateKey {
  privateKey: string
}

export interface IRestoreAddressFromPrivateKeyResponse {
  address: string
}

export interface ITransfer {
  fromPrivateKey: string
  toAddress: string
  value: number
  contract: string | null | undefined
  chain: string | null | undefined
}

export interface ITransferResponse {
  transactionId: string
}

export interface IWallet {
  generateAddress: ({}: IGenerateAddress) =>
    | Promise<IGenerateAddressResponse>
    | IGenerateAddressResponse
  restoreAddressFromPrivateKey: ({}: IRestoreAddressFromPrivateKey) =>
    | Promise<IRestoreAddressFromPrivateKeyResponse>
    | IRestoreAddressFromPrivateKeyResponse
  balance: ({}: IBalance) => Promise<IBalanceResponse>
  transfer: ({}: ITransfer) => Promise<ITransferResponse>
  transactions: ({}: ITransactions) => Promise<ITransactionsResponse[]>
  transaction: ({}: ITransaction) => Promise<ITransactionResponse>
}
