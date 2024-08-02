import type { ApiAccount } from '../api-interface';
import {
  AccountBaseType,
  ApiAccountTypeConfig,
} from '../config';
import type { DepositAccount } from '../interface';

export default function accountMapper(apiAccount: ApiAccount): DepositAccount {
  const commonProps = {
    id: apiAccount.id,
    name: apiAccount.nickName,
    alias: apiAccount.nickName,
    accountNumber: apiAccount.accountNumber,
    type: ApiAccountTypeConfig[apiAccount.accountType],
  };

  return {
    ...commonProps,
    baseType: AccountBaseType.Deposit,
    accountingBalance: apiAccount.accountingBalance,
    balanceAvailable: apiAccount.depositDetails?.balances.available as number,
  };
}
