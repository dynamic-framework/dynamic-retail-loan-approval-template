/* eslint-disable react/jsx-props-no-spreading */
import { useCallback, useState } from 'react';
import {
  DModal,
  useFormatCurrency,
  DQuickActionCheck,
} from '@dynamic-framework/ui-react';
import type { ModalProps } from '@dynamic-framework/ui-react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getSavingAccounts, getReceiveAccount } from '../store/selectors';
import { setReceiveAccount } from '../store/slice';

export default function ModalAccountSelector({ closeModal }: ModalProps) {
  const dispatch = useAppDispatch();
  const accounts = useAppSelector(getSavingAccounts);
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
              line3={format(getAccounctValue(account))}
              name="radioAccounts"
              value={account.id as string}
              isChecked={value?.id === account.id}
              onEventChange={() => onConfirm(account)}
            />
          ))}
        </div>
      </div>
    </DModal>
  );
}
