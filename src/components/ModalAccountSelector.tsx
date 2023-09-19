/* eslint-disable react/jsx-props-no-spreading */
import { useCallback, useState } from 'react';
import {
  MModal,
  useFormatCurrency,
  MQuickActionCheck,
} from '@dynamic-framework/ui-react';
import type { ModalProps } from '@dynamic-framework/ui-react';
import { getProductValue } from '@modyo-dynamic/modyo-service-retail';
import type { Product } from '@modyo-dynamic/modyo-service-retail';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getSavingAccounts, getReceiveAccount } from '../store/selectors';
import { setReceiveAccount } from '../store/slice';

export default function ModalAccountSelector({ closeModal }: ModalProps) {
  const dispatch = useAppDispatch();
  const accounts = useAppSelector(getSavingAccounts);
  const receiveAccount = useAppSelector(getReceiveAccount);
  const [value, setValue] = useState<Product | undefined>(receiveAccount);
  const { format } = useFormatCurrency();

  const onConfirm = useCallback((newValue: Product) => {
    setValue(newValue);
    dispatch(setReceiveAccount(newValue));
    closeModal();
  }, [closeModal, dispatch]);

  return (
    <MModal
      name="accountSelector"
      isCentered
      isStatic
    >
      <div slot="body">
        <div className="d-flex flex-column p-3">
          {accounts.map((account) => (
            <MQuickActionCheck
              key={account.id}
              mId={`account-${account.id}`}
              line1={account.name}
              line2={`••• ${account.productNumber.slice(-3)}`}
              line3={format(getProductValue(account))}
              name="radioAccounts"
              value={account.id as string}
              isChecked={value?.id === account.id}
              onMChange={() => onConfirm(account)}
            />
          ))}
        </div>
      </div>
    </MModal>
  );
}
