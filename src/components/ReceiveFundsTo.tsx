/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react/jsx-props-no-spreading */
import {
  DButton,
  DCard,
  DSelect,
} from '@dynamic-framework/ui-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import useDepositAccounts from '../services/hooks/useDepositAccounts';
import useTransferTo from '../services/hooks/useTransferTo';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getDepositAccounts, getReceiveAccount } from '../store/selectors';
import { setReceiveAccount } from '../store/slice';

import AccountLoader from './loaders/AccountLoader';

export default function ReceiveFundsTo() {
  const { t } = useTranslation();
  const { loading: loadingAccounts } = useDepositAccounts();
  const { loading: loadingTransfer, transfer } = useTransferTo();
  const receiveAccount = useAppSelector(getReceiveAccount);
  const accounts = useAppSelector(getDepositAccounts);
  const dispatch = useAppDispatch();

  const OPTIONS = useMemo(() => (
    accounts.map((account) => ({
      ...account,
      label: `${account.name} - ${account.accountNumber.slice(-3)}`,
      value: account.id,
    }))
  ), [accounts]);

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8 col-xl-6">
        <DCard>
          <DCard.Body className="d-flex flex-column gap-4">
            <h2 className="fs-4 fw-bold">
              {t('receiveFunds')}
            </h2>
            {loadingAccounts && (
              <AccountLoader />
            )}
            {!loadingAccounts && receiveAccount && (
              <DSelect
                onChange={(account) => {
                  if (!account) return;
                  dispatch(setReceiveAccount(accounts.find((a) => a.id === account.id)));
                }}
                value={{
                  id: receiveAccount.id,
                  label: `${receiveAccount.name} - ${receiveAccount.accountNumber.slice(-3)}`,
                  value: receiveAccount.id,
                }}
                options={OPTIONS}
              />
            )}
            <div className="d-flex justify-content-center">
              <DButton
                text={t('button.continue')}
                loading={loadingTransfer}
                onClick={transfer}
                {...!receiveAccount && {
                  state: 'disabled',
                }}
              />
            </div>
          </DCard.Body>
        </DCard>
      </div>
    </div>
  );
}
