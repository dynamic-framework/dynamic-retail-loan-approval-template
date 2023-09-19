/* eslint-disable react/jsx-props-no-spreading */
import { useCallback, useState } from 'react';
import {
  DModal,
  useFormatCurrency,
  DQuickActionCheck,
} from '@dynamic-framework/ui-react';
import type { ModalProps } from '@dynamic-framework/ui-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getDepositAccounts, getReceiveAccount } from '../store/selectors';
import { Account } from '../services/interface';
import { setReceiveAccount } from '../store/slice';

export default function ModalAccountSelector({ closeModal }: ModalProps) {
  const dispatch = useAppDispatch();
  const accounts = useAppSelector(getDepositAccounts);
  const receiveAccount = useAppSelector(getReceiveAccount);
  const [value, setValue] = useState<Account | undefined>(receiveAccount);
  const { format } = useFormatCurrency();

  const onConfirm = useCallback((newValue: Account) => {
    setValue(newValue);
    dispatch(setReceiveAccount(newValue));
    closeModal();
  }, [closeModal, dispatch]);

  return (
    <DModal
      name="accountSelector"
      innerClass="d-block"
      isCentered
      isStatic
    >
      <div slot="body">
        <div className="d-flex flex-column p-3">
          {accounts.map((account) => (
            <DQuickActionCheck
              key={account.id}
              innerId={`account-${account.id}`}
              line1={account.name}
              line2={`••• ${account.accountNumber.slice(-3)}`}
              line3={format(account.balanceAvailable)}
              name="radioAccounts"
              value={account.id}
              isChecked={value?.id === account.id}
              onEventChange={() => onConfirm(account)}
            />
          ))}
        </div>
      </div>
    </DModal>
  );
}
