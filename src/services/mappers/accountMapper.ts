import type { ApiAccount } from '../api-interface';
import type { DepositAccount } from '../interface';

export default function accountMapper(apiAccount: ApiAccount): DepositAccount {
  return {
    id: apiAccount.id,
    number: apiAccount.number,
    maskedNumber: apiAccount.masked_number,
    accountName: apiAccount.account_name,
  };
}
