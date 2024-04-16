/* eslint-disable react/jsx-props-no-spreading */
import { useCallback, useState } from 'react';
import {
  DModal,
  useFormatCurrency,
  DQuickActionCheck,
  DModalBody,
  useDPortalContext,
} from '@dynamic-framework/ui-react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getDepositAccounts, getReceiveAccount } from '../store/selectors';
import { Account } from '../services/interface';
import { setReceiveAccount } from '../store/slice';

export default function ModalAccountSelector() {
  const dispatch = useAppDispatch();
  const { closePortal } = useDPortalContext();
  const accounts = useAppSelector(getDepositAccounts);
  const receiveAccount = useAppSelector(getReceiveAccount);
  const [value, setValue] = useState<Account | undefined>(receiveAccount);
  const { format } = useFormatCurrency();

  const onConfirm = useCallback((newValue: Account) => {
    setValue(newValue);
    dispatch(setReceiveAccount(newValue));
    closePortal();
  }, [closePortal, dispatch]);

  return (
    <DModal
      name="accountSelector"
      className="d-block"
      centered
      staticBackdrop
    >
      <DModalBody className="p-4">
        <div className="d-flex flex-column">
          {accounts.map((account) => (
            <DQuickActionCheck
              key={account.id}
              id={`account-${account.id}`}
              line1={account.name}
              line2={`••• ${account.accountNumber.slice(-3)}`}
              line3={format(account.balanceAvailable)}
              name="radioAccounts"
              value={account.id}
              checked={value?.id === account.id}
              onChange={() => onConfirm(account)}
            />
          ))}
        </div>
      </DModalBody>
    </DModal>
  );
}
